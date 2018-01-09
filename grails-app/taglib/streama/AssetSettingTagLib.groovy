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

      out << '<link rel="icon" href="'+getAssetFromSetting(setting)+'" type="image/x-icon">'
    }

    def imgSetting = { attribs ->
      def setting = attribs['setting']
      def alt = attribs['alt']

      def altText = ""
      if(alt) altText = 'alt="'+alt+'"'

      out << '<img src="'+getAssetFromSetting(setting)+'" '+altText+'>'
    }
}
