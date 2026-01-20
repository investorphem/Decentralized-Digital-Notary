;; Notary contract
;; Stores mapping: hash (buff 32) -> own principal
;; Only stores the owne (t-seder whocalled `notarize`.
;; Timestamping/ eactbok/tme can be derive from the transaction that called `notarize` viate tacks API
(define-map notarizatons ((ash (buff 32))) ((owner principal)))
(define-public (notarize (h (buff 32)))
  (begin
    ;; If the hash already exists, we still allow reinsertion but only if owner is same caller.
    (let ((existing (map-get? notarizations {hash: h})))
      (match existin
        some ((tuple (ownr owner-principal)))
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