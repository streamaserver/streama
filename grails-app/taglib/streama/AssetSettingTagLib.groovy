package streama

class AssetSettingTagLib {

    def getAssetFromSetting(setting){
      if(setting.startsWith("upload:")){
        def id = setting.split(":")[1]
        def file = File.get(id)

        return file.getSrc()
      }else{
        return setting
      }
    }

    def linkRelIconSetting = { attribs ->
      def setting = attribs['setting']

      if(!setting){
        return
      }

      out << '<link rel="icon" href="'+getAssetFromSetting(setting)+'" type="image/x-icon">'
    }

    def imgSetting = { attribs ->
      def setting = attribs['setting']
      def alt = attribs['alt']
      def classNames = attribs['class']

      def altText = ""
      if(alt) altText = 'alt="'+alt+'"'

      if(!setting){
        return
      }
      out << '<img class="'+classNames+'" src="'+getAssetFromSetting(setting)+'" '+altText+'>'
    }

    def cssBackgroundSetting = { attribs ->
      def setting = attribs['setting']
      def selector = attribs['selector']

      if(!setting){
        return
      }

      out << '<style>'
      out << selector
      out << '{ background-image: url('
      out << getAssetFromSetting(setting)
      out << ');}</style>'
    }


    def googleAnalytics = { attribs ->
      def enabled = grailsApplication.config.streama.googleAnalytics?.enabled
      def id = grailsApplication.config.streama.googleAnalytics?.id

      if(!enabled){
        return
      }

      out << '<!-- Global site tag (gtag.js) - Google Analytics -->'
      out << '<script async src="https://www.googletagmanager.com/gtag/js?id='+ id +'"></script>'
      out << '<script>'
      out << 'window.dataLayer = window.dataLayer || [];'
      out << 'function gtag(){dataLayer.push(arguments);}'
      out << 'gtag(\'js\', new Date());'
      out << 'gtag(\'config\', \'UA-124224387-2\');'
      out << '</script>'
    }
}
