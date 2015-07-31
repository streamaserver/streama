class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "/setSettings"(view:'/setSettings')
    
        "500"(view:'/error')
	}
}
