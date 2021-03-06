package streama


import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class CertificationController {

    def theMovieDbService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        params.max = 999
        def certifications = Certification.where {
          if(params.type){
            type == params.type
          }
        }.list(params)

      respond certifications, [status: OK]
    }

    @Transactional
    def save() {
        def data = request.JSON
        Certification certificationInstance = data.id ? Certification.get(data.id) : new Certification()

        certificationInstance.properties = data
        certificationInstance.validate()
        if (certificationInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        certificationInstance.save flush:true
        respond certificationInstance, [status: CREATED]
    }

    @Transactional
    def importCertifications() {
      String type = params.type
      def certifications = theMovieDbService.listCertifications(type)
      List<Certification> certificationResult = []

      certifications.each{ certData ->
        if(Certification.findByCertificationAndType(certData.certification, type)){
          return
        }
        Certification certification = new Certification()
        certification.certification = certData.certification
        certification.description = certData.meaning
        certification.type = type
        certification.save()

        certificationResult.add(certification)
      }

      respond certificationResult
    }

    @Transactional
    def update(Certification certificationInstance) {
        if (certificationInstance == null) {
            render status: NOT_FOUND
            return
        }

        certificationInstance.validate()
        if (certificationInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        certificationInstance.save flush:true
        respond certificationInstance, [status: OK]
    }

    @Transactional
    def delete(Certification certificationInstance) {

        if (certificationInstance == null) {
            render status: NOT_FOUND
            return
        }
        if (certificationInstance.apiId) {
            render status: PRECONDITION_FAILED
            return
        }

        certificationInstance.delete flush:true
        render status: NO_CONTENT
    }

    def show(Certification certificationInstance) {
        respond certificationInstance, [status: OK]
    }
}
