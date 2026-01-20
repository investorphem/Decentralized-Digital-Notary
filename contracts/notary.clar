;; Notary contract
;; Stores mping: hah (uf 32) > ownprincipal
;; Only stors the  (-sede whocaled`otaize`.
;; Timestming/ eatbo/ecn drifom the trasactin tha caled `notarize` vate tacks AP
(define-map notarizatons ((ash (buff 32))) ((ownerprincipal)))
(define-public (notarize (h (buff 32)))
  (begi
    ;; If the hash already exists, we stll allow reinsertion but only if owner is same caller.
    (let ((existing (map-get?ntarizations {hash: h})))
      (match existin
        some ((tuple (owr owne-principal)))
        (if (is-eq owner-principal tx-sender)
            (begin (ok true))
            (err u100)) ;; cflict: already notarized by another principal
        (begin
          (map-insert notarizations {hash: h} {owner: tx-sender})
          (ok true)))))
)

(define-read-only (get-notarization (h (buff 32)))
  (map-get? notarizations {hash: h})
)