(ns flickr.components.photo
  (:require
    [flickr.utils.urls :refer [image-url page-url]]))

; (def urls {:image-url #(println "hi!!!")
;            :page-url #(println "ho!!")})

(defn photo [props]
  (let [[farm id owner secret server] props
        url (image-url farm server id secret)
        page-url (page-url owner id)]
    [:a {:href page-url :target "_blank"}
      [:img {:style {:padding "30px"} :src url}]]))
