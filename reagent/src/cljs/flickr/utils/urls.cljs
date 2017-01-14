(ns flickr.utils.urls)

(defn image-url [& args]
  (let [is-valid (every? identity args)]
    (if (not is-valid)
      (println "Not valid!")
      (println "is valid :)"))))

(defn page-url [user-id photo-id]
  (if (every? identity [user-id photo-id])
    (println "all good!")
    (println "not good...")))
