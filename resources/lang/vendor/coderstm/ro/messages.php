<?php

return [
    'account_disabled' => 'Contul tău a fost dezactivat și nu poate accesa această aplicație. Te rog să iei legătura cu administratorul.',
    'logout' => 'Ai fost deconectat cu succes!',
    'password' => [
        'changed' => 'Parola a fost schimbată cu succes!',
        'reset' => 'Resetarea parolei a fost efectuată cu succes!'
    ],
    'invalid_token' => 'Token invalid sau token-ul poate să fi expirat!',
    'invalid_user' => 'Utilizatorul nu a fost găsit!',
    'reset_throttled' => 'Emailul de resetare a parolei a fost deja trimis. Te rog să încerci din nou mai târziu!',
    'reset_email_sent' => 'Linkul de resetare a parolei a fost trimis cu succes!',
    'payment_method' => [
        'already' => 'Metoda de plată există deja în contul tău.',
        'success' => 'Ai adăugat cu succes o nouă metodă de plată.',
        'default' => 'Ai actualizat cu succes metoda de plată implicită.',
        'destory' => 'Ai eliminat cu succes metoda de plată.',
        'authenticate' => 'Nu putem autentifica metoda ta de plată. Te rog să alegi o altă metodă de plată sau să încerci din nou.',
    ],
    'subscription' => [
        'none' => 'Pentru a accesa funcționalitățile exclusive ale sălii de sport, te rog să te abonezi la un plan. În prezent, nu ești abonat la niciun plan.',
        'canceled' => 'Ai anulat abonamentul. Abonamentul tău va expira la data de :date',
        'plan_canceled' => 'Subscribed plan has been deactivated. Your subscription will end on :date',
        'past_due' => 'Pentru a activa abonamentul, te rog să efectuezi plata de :amount.',
        'downgrade' => 'New plan :plan with :amount will become effective on :date.',
        'active' => 'Următoarea factură: :amount la data de :date',
        'success' => '{0} Te-ai abonat cu succes la planul :plan.|[1,*] Te rog să contactezi recepția noastră pentru a efectua plata și a-ți finaliza abonamentul!',
        'cancel' => 'Ai anulat cu succes abonamentul tău.',
        'upgraded' => 'Ai actualizat cu succes abonamentul tău.',
        'resume' => 'Ai reluat cu succes abonamentul tău.',
        'due_payment' => 'Plata scadentă a fost primită.',
    ],
    'settings_update' => 'Setările aplicației au fost actualizate cu succes!',
    'files' => [
        'destroy' => '{1} Fișierul a fost șters cu succes!|[2,*] Fișierele au fost șterse cu succes!',
        'restored' => '{1} Fișierul a fost restaurat cu succes!|[2,*] Fișierele au fost restaurate cu succes!',
        'not_found' => 'Fișierul nu a fost găsit!',
    ],
    'groups' => [
        'store' => 'Grupul a fost creat cu succes!',
        'updated' => 'Grupul a fost actualizat cu succes!',
        'destroy' => '{1} Grupul a fost șters cu succes!|[2,*] Grupurile au fost șterse cu succes!',
        'restored' => '{1} Grupul a fost restaurat cu succes!|[2,*] Grupurile au fost restaurate cu succes!',
    ],
    'plans' => [
        'store' => 'Planul a fost creat cu succes!',
        'updated' => 'Planul a fost actualizat cu succes!',
        'destroy' => '{1} Planul a fost șters cu succes!|[2,*] Planurile au fost șterse cu succes!',
        'restored' => '{1} Planul a fost restaurat cu succes!|[2,*] Planurile au fost restaurate cu succes!',
        'status' => 'Planul a fost marcat ca :type cu succes!',
    ],
    'logs' => [
        'updated' => 'Jurnalul a fost actualizat cu succes!',
        'destroy' => 'Jurnalul a fost șters cu succes!',
        'reply' => 'Răspunsul la jurnal a fost creat cu succes!',
    ],
    'tasks' => [
        'store' => 'Task-ul a fost creat cu succes!',
        'updated' => 'Task-ul a fost actualizat cu succes!',
        'destroy' => '{1} Task-ul a fost șters cu succes!|[2,*] Task-urile au fost șterse cu succes!',
        'restored' => '{1} Task-ul a fost restaurat cu succes!|[2,*] Task-urile au fost restaurate cu succes!',
        'status' => 'Task-ul a fost marcat ca :type cu succes!',
        'reply' => 'Răspunsul a fost creat cu succes!',
    ],
    'enquiry' => [
        'store' => 'Cererea a fost creată cu succes!',
        'updated' => 'Cererea a fost actualizată cu succes!',
        'destroy' => '{1} Cererea a fost ștearsă cu succes!|[2,*] Cererile au fost șterse cu succes!',
        'restored' => '{1} Cererea a fost restaurată cu succes!|[2,*] Cererile au fost restaurate cu succes!',
        'status' => 'Cererea a fost marcată ca :type cu succes!',
        'reply' => 'Răspunsul a fost creat cu succes!',
    ],
    'staff' => [
        'store' => 'Contul de personal a fost creat cu succes!',
        'updated' => 'Contul de personal a fost actualizat cu succes!',
        'destroy' => '{1} Contul de personal a fost șters cu succes!|[2,*] Conturile de personal au fost șterse cu succes!',
        'restored' => '{1} Contul de personal a fost restaurat cu succes!|[2,*] Conturile de personal au fost restaurate cu succes!',
        'status' => 'Contul de personal a fost marcat ca :type cu succes!',
        'password' => 'Linkul de resetare a parolei a fost trimis cu succes!',
        'admin_error' => 'Personalul nu poate actualiza permisiunile propriului cont.',
        'admin_success' => 'Contul de personal a fost marcat cu succes ca administrator :type!',
    ],
    'users' => [
        'store' => 'Contul utilizatorului a fost creat cu succes!',
        'updated' => 'Contul utilizatorului a fost actualizat cu succes!',
        'destroy' => '{1} Contul utilizatorului a fost șters cu succes!|[2,*] Conturile utilizatorilor au fost șterse cu succes!',
        'restored' => '{1} Contul utilizatorului a fost restaurat cu succes!|[2,*] Conturile utilizatorilor au fost restaurate cu succes!',
        'status' => 'Contul utilizatorului a fost marcat ca :type cu succes!',
        'password' => 'Linkul de resetare a parolei a fost trimis cu succes!',
        'note' => 'Nota a fost adăugată cu succes!',
    ],

    'attributes' => [
        'active' => 'active',
        'deactive' => 'dezactivat',
        'archived' => 'arhivat',
        'unarchive' => 'dezarhivat',
        'marked' => 'bifat',
        'unmarked' => 'debifat',
    ]
];
