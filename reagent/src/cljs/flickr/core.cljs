(ns flickr.core
  (:require
   [reagent.core :as reagent]
   [flickr.config :refer [config]]
   [flickr.components.photos :refer [photos]]
   [flickr.components.search-input :refer [search-input]]
   [flickr.components.status :refer [status]]
   [flickr.state :refer [state]]))

(defn flickr-app [app-state]
  [:div {:style {:fontFamily "arial" :width "100%" :textAlign "center"}}
    (status (:status @app-state))
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
