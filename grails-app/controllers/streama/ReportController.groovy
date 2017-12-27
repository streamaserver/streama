package streama

import grails.converters.JSON

import java.nio.file.Files
import java.nio.file.Paths

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ReportController {

  static responseFormats = ['json', 'xml']
//  static allowedMethods = [save: "PUT"]

  def springSecurityService

  def index () {
    def filter = params.filter
    def responseObj = [
      reports: [],
      count: 0
    ]

    if(filter == 'all'){
      responseObj.reports = Report.list(params)
      responseObj.count = Report.count()
    }
    if(filter == 'unresolved'){
      responseObj.reports = Report.list().findAll{!it.resolved}
      responseObj.count = responseObj.reports?.size()
    }
    if(filter == 'resolved'){
      responseObj.reports = Report.list().findAll{it.resolved}
      responseObj.count = responseObj.reports?.size()
    }
    JSON.use('adminReports'){
      render (responseObj as JSON)
    }
  }

  def save() {
    def jsonData = request.JSON
    Video currentVideo = Video.get(jsonData.videoId)
    String errorCode = jsonData.errorCode
    User currentUser = springSecurityService.currentUser
    Integer preExistingReportCount = Report.where {
      and {
        eq('video', currentVideo)
        eq('createdBy', currentUser)
        ne('resolved', true)
        eq('errorCode', errorCode)
      }
    }.count()
    if (preExistingReportCount > 0) {
      render(status: 412, text: 'Report already sent.')
      return
    }
    Report newReport = new Report()
    newReport.errorCode = errorCode
    newReport.createdBy = currentUser
    newReport.video = currentVideo
    newReport.resolved = false
    newReport.save()
    respond newReport
  }

  @Transactional
  def resolve() {
    def jsonData = request.JSON
    def report = Report.get(jsonData.reportId)
    report.resolved = true
    report.lastUpdated = new Date()
    report.save()

    respond report
  }

  @Transactional
  def unresolve() {
    def jsonData = request.JSON
    def report = Report.get(jsonData.reportId)
    report.resolved = false
    report.lastUpdated = new Date()
    report.save()

    respond report
  }

  @Transactional
  def resolveMultiple() {
    def jsonData = request.JSON
    def resolvedReports = []
    jsonData.ids.each { id ->
      def report = Report.get(id)
      report.resolved = true
      report.lastUpdated = new Date()
      report.save()
      resolvedReports.add([
        id:id,
        resolved:report.resolved,
        lastUpdated:report.lastUpdated
      ])
    }
    respond resolvedReports
  }

  @Transactional
  def reportsById() {
    def videoId = params.long('videoId')
    def video = Video.get(videoId)
    def reports = Report.findAllByVideoAndResolved(video, false)
    def reportCount = [:]
    reportCount.reportCount = reports.size()
    respond reportCount
  }
}
