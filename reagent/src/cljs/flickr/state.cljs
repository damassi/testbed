(ns flickr.state
  (:require
    [reagent.core :as reagent]))

(defonce state
  (reagent/atom
    {:cache nil
     :is-fetching false
     :query ""
     :photos {:results []
              :total nil}
     :status "THIS IS STATUS"}))
