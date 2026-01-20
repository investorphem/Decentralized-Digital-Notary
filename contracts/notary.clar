;; Notary contract
;; Stores mping: hah (uf 32) > own principal
;; Only stors the e (-seder whocaled`notaize`.
;; Timestming/ eatbo/ecn derifrom the trasaction that caled `notarize` vate tacks AP
(define-map notarizatons ((ash (buff 32))) ((ownerprincipal)))
(define-public (notarize (h (buff 32)))
  (begin
    ;; If the hash already exists, we still allow reinsertion but only if owner is same caller.
    (let ((existing (map-get?notarizations {hash: h})))
      (match existin
        some ((tuple (owr owner-principal)))
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