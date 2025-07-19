package com.techdevclub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    // Catch all handler: send all requests to index.html 
    // so that React Router can handle routing
    @RequestMapping(value = {
        "/", 
        "/about", 
        "/join", 
        "/events", 
        "/projects", 
        "/team", 
        "/blog", 
        "/resources", 
        "/gallery", 
        "/contact", 
        "/highlights", 
        "/spotlights", 
        "/volunteer", 
        "/testimonials", 
        "/code-of-conduct", 
        "/terms", 
        "/privacy", 
        "/admin"
    })
    public String index() {
        return "forward:/index.html";
    }
}