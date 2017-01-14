(ns flickr.core
  (:require
    [reagent.core :as reagent]
    [flickr.components.loader :refer [loader]]
    [flickr.components.photo :refer [photo]]
    [flickr.components.photos :refer [photos]]
    [flickr.components.search-input :refer [search-input]]
    [flickr.components.status :refer [status]]
    [flickr.utils.api :refer [search]]
    [flickr.state :refer [state]]))

(def styles {:style
              {:fontFamily "arial"
               :width "100%"
               :textAlign "center"}})

(defn flickr-app [app-state]
  (search "FOO")
  [:div styles
    (status (:status @app-state))
    [loader]
    [photo]
    (search-input)
    (photos)])

(defonce debug?
  ^boolean js/goog.DEBUG)

(defn dev-setup []
  (when debug?
    (enable-console-print!)
    (println "dev mode")))

(defn reload []
  (reagent/render [flickr-app state]
                  (.getElementById js/document "app")))

(defn ^:export main []
  (dev-setup)
  (reload))
