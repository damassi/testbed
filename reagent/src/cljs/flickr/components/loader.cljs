(ns flickr.components.loader
  (:require [reagent.core :as r]))

(def styles {:style
              {:color "#666"
               :float "left"
               :display "block"
               :fontSize "45px"
               :position "relative"
               :top "-27px"}})

(defonce is-on (r/atom false))
(defonce timer (r/atom nil))

(defn start-blinker []
  (reset! timer (js/window.setInterval #(swap! is-on not) 1000)))

(defn stop-blinker []
  (js/window.clearInterval @timer))

(defn loader []
  (r/create-class
    {:component-did-mount start-blinker
     :component-will-unmount stop-blinker
     :reagent-render
      (fn []
        (let [dot (if (= @is-on true) "." "")]
          [:span styles dot]))}))
