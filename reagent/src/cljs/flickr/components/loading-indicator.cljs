(ns flickr.components.loading-indicator)

(def styles {:color "#666"
             :float "left"
             :display "block"
             :fontSize "45px"
             :position "relative"
             :top "-27px"})

(defn loading-indicator []
  [:span {:style styles}
    "this is a loader"])
