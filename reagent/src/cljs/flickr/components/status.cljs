(ns flickr.components.status)

(defn status [& msg]
  (when msg
    [:div msg]))
