/* =========================================
   DATEN
========================================= */

let accounts = {};
let account = null;
let currentAccountEmail = null;

let destination = "";
let destinations = [];
let selectedDestinationIndex = null;

let people = [];
let selectedPeople = [];

let currentJourney = null;

let watchId = null;
let locationStartTime = null;
let locationTimerInterval = null;

let deleteType = null;
let deleteIndex = null;

let destinationCoords = null;
let progressHistory = [];
let routeCheckInterval = null;
let checkInActive = false;
let checkInDeadline = null;
let checkInCountdownInterval = null;
let checkInCooldownUntil = null;

let currentLanguage =
    localStorage.getItem("safewayLanguage") || "de";


/* =========================================
   ÜBERSETZUNGEN
   SafeWay bleibt als App-Name unverändert.
========================================= */

const translations = {

de: {
    authSubtitle: "Bitte registriere dich oder melde dich an.",
    register: "Registrieren",
    login: "Anmelden",
    name: "NAME",
    email: "E-MAIL",
    password: "PASSWORT",
    phone: "TELEFONNUMMER",
    namePlaceholder: "Dein Name",
    passwordPlaceholder: "Passwort",
    registerAccount: "Account registrieren",
    forgotPassword: "Passwort vergessen?",
    subtitle: "Deine Begleitung nach Hause",
    savedDestinations: "GESPEICHERTE ZIELE",
    or: "oder",
    newDestination: "NEUES ZIEL",
    addressPlaceholder: "Adresse eingeben...",
    saveDestination: "✓ Ziel speichern",
    currentDestination: "Aktuelles Ziel",
    changeDestination: "Ziel ändern",
    openMaps: "🗺️ Route in Google Maps öffnen",
    trustedPeople: "VERTRAUENSPERSONEN",
    startJourney: "▶ Begleitung starten",
    journeyActive: "Begleitung aktiv",
    active: "● Begleitung aktiv",
    onWay: "Du bist unterwegs",
    arrival: "🏠 Angekommen",
    account: "👤 Account",
    editAccount: "Account bearbeiten",
    logout: "Abmelden",
    saveChanges: "Änderungen speichern",
    forgotPasswordTitle: "Passwort vergessen",
    newPassword: "NEUES PASSWORT",
    resetPassword: "Passwort ändern",
    settings: "⚙️ Einstellungen",
    language: "SPRACHE",
    savePlace: "📍 Ziel speichern",
    placeName: "NAME DES ZIELS",
    address: "ADRESSE",
    save: "✓ Speichern",
    cancel: "Abbrechen",
    addPerson: "👤 Person hinzufügen",
    savePerson: "＋ Person speichern",
    arrived: "Du bist angekommen",
    journeyFinished: "Deine Begleitung wurde beendet.",
    done: "Fertig",
    deleteTitle: "Wirklich löschen?",
    deleteText: "Möchtest du diesen Eintrag wirklich löschen?",
    delete: "Löschen",
    locationSharing: "Standortfreigabe",
    locationSharingInfo: "Dein Standort wird während der Begleitung geteilt.",
    locationStarting: "Standortfreigabe wird gestartet...",
    locationActive: "Standortfreigabe aktiv",
    locationDenied: "Standortfreigabe konnte nicht gestartet werden.",
    locationUnavailable: "Standort ist momentan nicht verfügbar.",
    locationStopped: "Standortfreigabe beendet.",
    sendLocationSms: "📤 Standort per SMS senden",
    sendLocationWhatsapp: "💬 Standort per WhatsApp senden",
    checkInTitle: "Bist du noch okay?",
    checkInText: "Es sieht so aus, als würdest du dich nicht mehr in Richtung deines Ziels bewegen. Bitte melde dich.",
    checkInConfirm: "✓ Ja, mir geht's gut",
    select: "Auswählen",
    selected: "✓"
},

en: {
    authSubtitle: "Please register or log in.",
    register: "Register",
    login: "Log in",
    name: "NAME",
    email: "EMAIL",
    password: "PASSWORD",
    phone: "PHONE NUMBER",
    namePlaceholder: "Your name",
    passwordPlaceholder: "Password",
    registerAccount: "Register account",
    forgotPassword: "Forgot password?",
    subtitle: "Your companion on the way home",
    savedDestinations: "SAVED DESTINATIONS",
    or: "or",
    newDestination: "NEW DESTINATION",
    addressPlaceholder: "Enter address...",
    saveDestination: "✓ Save destination",
    currentDestination: "Current destination",
    changeDestination: "Change destination",
    openMaps: "🗺️ Open route in Google Maps",
    trustedPeople: "TRUSTED PEOPLE",
    startJourney: "▶ Start journey",
    journeyActive: "Journey active",
    active: "● Journey active",
    onWay: "You are on your way",
    arrival: "🏠 Arrived",
    account: "👤 Account",
    editAccount: "Edit account",
    logout: "Log out",
    saveChanges: "Save changes",
    forgotPasswordTitle: "Forgot password",
    newPassword: "NEW PASSWORD",
    resetPassword: "Change password",
    settings: "⚙️ Settings",
    language: "LANGUAGE",
    savePlace: "📍 Save destination",
    placeName: "DESTINATION NAME",
    address: "ADDRESS",
    save: "✓ Save",
    cancel: "Cancel",
    addPerson: "👤 Add person",
    savePerson: "＋ Save person",
    arrived: "You have arrived",
    journeyFinished: "Your journey has ended.",
    done: "Done",
    deleteTitle: "Delete this?",
    deleteText: "Do you really want to delete this entry?",
    delete: "Delete",
    locationSharing: "Location sharing",
    locationSharingInfo: "Your location is shared during the journey.",
    locationStarting: "Starting location sharing...",
    locationActive: "Location sharing active",
    locationDenied: "Location sharing could not be started.",
    locationUnavailable: "Location is currently unavailable.",
    locationStopped: "Location sharing stopped.",
    sendLocationSms: "📤 Send location via SMS",
    sendLocationWhatsapp: "💬 Send location via WhatsApp",
    checkInTitle: "Are you still okay?",
    checkInText: "It looks like you haven't made progress toward your destination. Please check in.",
    checkInConfirm: "✓ Yes, I'm fine",
    select: "Select",
    selected: "✓"
},

es: {
    authSubtitle: "Regístrate o inicia sesión.",
    register: "Registrarse",
    login: "Iniciar sesión",
    name: "NOMBRE",
    email: "CORREO ELECTRÓNICO",
    password: "CONTRASEÑA",
    phone: "NÚMERO DE TELÉFONO",
    namePlaceholder: "Tu nombre",
    passwordPlaceholder: "Contraseña",
    registerAccount: "Registrar cuenta",
    forgotPassword: "¿Olvidaste tu contraseña?",
    subtitle: "Tu acompañamiento de camino a casa",
    savedDestinations: "DESTINOS GUARDADOS",
    or: "o",
    newDestination: "NUEVO DESTINO",
    addressPlaceholder: "Introducir dirección...",
    saveDestination: "✓ Guardar destino",
    currentDestination: "Destino actual",
    changeDestination: "Cambiar destino",
    openMaps: "🗺️ Abrir ruta en Google Maps",
    trustedPeople: "PERSONAS DE CONFIANZA",
    startJourney: "▶ Iniciar acompañamiento",
    journeyActive: "Acompañamiento activo",
    active: "● Acompañamiento activo",
    onWay: "Estás de camino",
    arrival: "🏠 Llegué",
    account: "👤 Cuenta",
    editAccount: "Editar cuenta",
    logout: "Cerrar sesión",
    saveChanges: "Guardar cambios",
    forgotPasswordTitle: "Contraseña olvidada",
    newPassword: "NUEVA CONTRASEÑA",
    resetPassword: "Cambiar contraseña",
    settings: "⚙️ Ajustes",
    language: "IDIOMA",
    savePlace: "📍 Guardar destino",
    placeName: "NOMBRE DEL DESTINO",
    address: "DIRECCIÓN",
    save: "✓ Guardar",
    cancel: "Cancelar",
    addPerson: "👤 Añadir persona",
    savePerson: "＋ Guardar persona",
    arrived: "Has llegado",
    journeyFinished: "Tu acompañamiento ha terminado.",
    done: "Listo",
    deleteTitle: "¿Eliminar?",
    deleteText: "¿Realmente quieres eliminar esta entrada?",
    delete: "Eliminar",
    locationSharing: "Compartir ubicación",
    locationSharingInfo: "Tu ubicación se comparte durante el acompañamiento.",
    locationStarting: "Iniciando la ubicación...",
    locationActive: "Compartir ubicación activo",
    locationDenied: "No se pudo iniciar la ubicación.",
    locationUnavailable: "La ubicación no está disponible.",
    locationStopped: "Compartir ubicación detenido.",
    sendLocationSms: "📤 Enviar ubicación por SMS",
    sendLocationWhatsapp: "💬 Enviar ubicación por WhatsApp",
    checkInTitle: "¿Sigues bien?",
    checkInText: "Parece que no estás avanzando hacia tu destino. Por favor confirma.",
    checkInConfirm: "✓ Sí, estoy bien",
    select: "Seleccionar",
    selected: "✓"
},

fr: {
    authSubtitle: "Inscris-toi ou connecte-toi.",
    register: "S'inscrire",
    login: "Se connecter",
    name: "NOM",
    email: "E-MAIL",
    password: "MOT DE PASSE",
    phone: "NUMÉRO DE TÉLÉPHONE",
    namePlaceholder: "Ton nom",
    passwordPlaceholder: "Mot de passe",
    registerAccount: "Créer un compte",
    forgotPassword: "Mot de passe oublié ?",
    subtitle: "Ton accompagnement sur le chemin du retour",
    savedDestinations: "DESTINATIONS ENREGISTRÉES",
    or: "ou",
    newDestination: "NOUVELLE DESTINATION",
    addressPlaceholder: "Saisir une adresse...",
    saveDestination: "✓ Enregistrer la destination",
    currentDestination: "Destination actuelle",
    changeDestination: "Modifier la destination",
    openMaps: "🗺️ Ouvrir l'itinéraire dans Google Maps",
    trustedPeople: "PERSONNES DE CONFIANCE",
    startJourney: "▶ Démarrer l'accompagnement",
    journeyActive: "Accompagnement actif",
    active: "● Accompagnement actif",
    onWay: "Tu es en route",
    arrival: "🏠 Arrivé",
    account: "👤 Compte",
    editAccount: "Modifier le compte",
    logout: "Se déconnecter",
    saveChanges: "Enregistrer les modifications",
    forgotPasswordTitle: "Mot de passe oublié",
    newPassword: "NOUVEAU MOT DE PASSE",
    resetPassword: "Modifier le mot de passe",
    settings: "⚙️ Paramètres",
    language: "LANGUE",
    savePlace: "📍 Enregistrer la destination",
    placeName: "NOM DE LA DESTINATION",
    address: "ADRESSE",
    save: "✓ Enregistrer",
    cancel: "Annuler",
    addPerson: "👤 Ajouter une personne",
    savePerson: "＋ Enregistrer la personne",
    arrived: "Tu es arrivé",
    journeyFinished: "Ton accompagnement est terminé.",
    done: "Terminé",
    deleteTitle: "Supprimer ?",
    deleteText: "Veux-tu vraiment supprimer cette entrée ?",
    delete: "Supprimer",
    locationSharing: "Partage de position",
    locationSharingInfo: "Ta position est partagée pendant l'accompagnement.",
    locationStarting: "Démarrage du partage de position...",
    locationActive: "Partage de position actif",
    locationDenied: "Le partage de position n'a pas pu démarrer.",
    locationUnavailable: "La position est actuellement indisponible.",
    locationStopped: "Partage de position arrêté.",
    sendLocationSms: "📤 Envoyer la position par SMS",
    sendLocationWhatsapp: "💬 Envoyer la position par WhatsApp",
    checkInTitle: "Est-ce que tout va bien ?",
    checkInText: "Il semble que tu ne progresses plus vers ta destination. Merci de confirmer.",
    checkInConfirm: "✓ Oui, tout va bien",
    select: "Sélectionner",
    selected: "✓"
},

it: {
    authSubtitle: "Registrati o accedi.",
    register: "Registrati",
    login: "Accedi",
    name: "NOME",
    email: "E-MAIL",
    password: "PASSWORD",
    phone: "NUMERO DI TELEFONO",
    namePlaceholder: "Il tuo nome",
    passwordPlaceholder: "Password",
    registerAccount: "Registra account",
    forgotPassword: "Password dimenticata?",
    subtitle: "Il tuo accompagnamento verso casa",
    savedDestinations: "DESTINAZIONI SALVATE",
    or: "oppure",
    newDestination: "NUOVA DESTINAZIONE",
    addressPlaceholder: "Inserisci indirizzo...",
    saveDestination: "✓ Salva destinazione",
    currentDestination: "Destinazione attuale",
    changeDestination: "Cambia destinazione",
    openMaps: "🗺️ Apri percorso in Google Maps",
    trustedPeople: "PERSONE DI FIDUCIA",
    startJourney: "▶ Avvia accompagnamento",
    journeyActive: "Accompagnamento attivo",
    active: "● Accompagnamento attivo",
    onWay: "Sei in viaggio",
    arrival: "🏠 Arrivato",
    account: "👤 Account",
    editAccount: "Modifica account",
    logout: "Esci",
    saveChanges: "Salva modifiche",
    forgotPasswordTitle: "Password dimenticata",
    newPassword: "NUOVA PASSWORD",
    resetPassword: "Cambia password",
    settings: "⚙️ Impostazioni",
    language: "LINGUA",
    savePlace: "📍 Salva destinazione",
    placeName: "NOME DELLA DESTINAZIONE",
    address: "INDIRIZZO",
    save: "✓ Salva",
    cancel: "Annulla",
    addPerson: "👤 Aggiungi persona",
    savePerson: "＋ Salva persona",
    arrived: "Sei arrivato",
    journeyFinished: "Il tuo accompagnamento è terminato.",
    done: "Fatto",
    deleteTitle: "Eliminare?",
    deleteText: "Vuoi davvero eliminare questa voce?",
    delete: "Elimina",
    locationSharing: "Condivisione posizione",
    locationSharingInfo: "La tua posizione viene condivisa durante l'accompagnamento.",
    locationStarting: "Avvio della condivisione...",
    locationActive: "Condivisione posizione attiva",
    locationDenied: "Impossibile avviare la condivisione.",
    locationUnavailable: "La posizione non è disponibile.",
    locationStopped: "Condivisione posizione terminata.",
    sendLocationSms: "📤 Invia posizione via SMS",
    sendLocationWhatsapp: "💬 Invia posizione via WhatsApp",
    checkInTitle: "Va tutto bene?",
    checkInText: "Sembra che tu non stia più avanzando verso la tua destinazione. Conferma per favore.",
    checkInConfirm: "✓ Sì, sto bene",
    select: "Seleziona",
    selected: "✓"
},

pt: {
    authSubtitle: "Regista-te ou inicia sessão.",
    register: "Registar",
    login: "Iniciar sessão",
    name: "NOME",
    email: "E-MAIL",
    password: "PALAVRA-PASSE",
    phone: "NÚMERO DE TELEFONE",
    namePlaceholder: "O teu nome",
    passwordPlaceholder: "Palavra-passe",
    registerAccount: "Registar conta",
    forgotPassword: "Esqueceste a palavra-passe?",
    subtitle: "O teu acompanhamento no caminho para casa",
    savedDestinations: "DESTINOS GUARDADOS",
    or: "ou",
    newDestination: "NOVO DESTINO",
    addressPlaceholder: "Introduzir morada...",
    saveDestination: "✓ Guardar destino",
    currentDestination: "Destino atual",
    changeDestination: "Alterar destino",
    openMaps: "🗺️ Abrir rota no Google Maps",
    trustedPeople: "PESSOAS DE CONFIANÇA",
    startJourney: "▶ Iniciar acompanhamento",
    journeyActive: "Acompanhamento ativo",
    active: "● Acompanhamento ativo",
    onWay: "Estás a caminho",
    arrival: "🏠 Cheguei",
    account: "👤 Conta",
    editAccount: "Editar conta",
    logout: "Terminar sessão",
    saveChanges: "Guardar alterações",
    forgotPasswordTitle: "Palavra-passe esquecida",
    newPassword: "NOVA PALAVRA-PASSE",
    resetPassword: "Alterar palavra-passe",
    settings: "⚙️ Definições",
    language: "IDIOMA",
    savePlace: "📍 Guardar destino",
    placeName: "NOME DO DESTINO",
    address: "MORADA",
    save: "✓ Guardar",
    cancel: "Cancelar",
    addPerson: "👤 Adicionar pessoa",
    savePerson: "＋ Guardar pessoa",
    arrived: "Chegaste",
    journeyFinished: "O teu acompanhamento terminou.",
    done: "Concluído",
    deleteTitle: "Eliminar?",
    deleteText: "Queres mesmo eliminar esta entrada?",
    delete: "Eliminar",
    locationSharing: "Partilha de localização",
    locationSharingInfo: "A tua localização é partilhada durante o acompanhamento.",
    locationStarting: "A iniciar partilha...",
    locationActive: "Partilha de localização ativa",
    locationDenied: "Não foi possível iniciar a partilha.",
    locationUnavailable: "A localização não está disponível.",
    locationStopped: "Partilha de localização terminada.",
    sendLocationSms: "📤 Enviar localização por SMS",
    sendLocationWhatsapp: "💬 Enviar localização por WhatsApp",
    checkInTitle: "Está tudo bem?",
    checkInText: "Parece que não estás a avançar em direção ao teu destino. Por favor confirma.",
    checkInConfirm: "✓ Sim, estou bem",
    select: "Selecionar",
    selected: "✓"
},

nl: {
    authSubtitle: "Registreer je of log in.",
    register: "Registreren",
    login: "Inloggen",
    name: "NAAM",
    email: "E-MAIL",
    password: "WACHTWOORD",
    phone: "TELEFOONNUMMER",
    namePlaceholder: "Je naam",
    passwordPlaceholder: "Wachtwoord",
    registerAccount: "Account registreren",
    forgotPassword: "Wachtwoord vergeten?",
    subtitle: "Je begeleiding onderweg naar huis",
    savedDestinations: "OPGESLAGEN BESTEMMINGEN",
    or: "of",
    newDestination: "NIEUWE BESTEMMING",
    addressPlaceholder: "Adres invoeren...",
    saveDestination: "✓ Bestemming opslaan",
    currentDestination: "Huidige bestemming",
    changeDestination: "Bestemming wijzigen",
    openMaps: "🗺️ Route openen in Google Maps",
    trustedPeople: "VERTROUWDE PERSONEN",
    startJourney: "▶ Begeleiding starten",
    journeyActive: "Begeleiding actief",
    active: "● Begeleiding actief",
    onWay: "Je bent onderweg",
    arrival: "🏠 Aangekomen",
    account: "👤 Account",
    editAccount: "Account bewerken",
    logout: "Uitloggen",
    saveChanges: "Wijzigingen opslaan",
    forgotPasswordTitle: "Wachtwoord vergeten",
    newPassword: "NIEUW WACHTWOORD",
    resetPassword: "Wachtwoord wijzigen",
    settings: "⚙️ Instellingen",
    language: "TAAL",
    savePlace: "📍 Bestemming opslaan",
    placeName: "NAAM BESTEMMING",
    address: "ADRES",
    save: "✓ Opslaan",
    cancel: "Annuleren",
    addPerson: "👤 Persoon toevoegen",
    savePerson: "＋ Persoon opslaan",
    arrived: "Je bent aangekomen",
    journeyFinished: "Je begeleiding is beëindigd.",
    done: "Klaar",
    deleteTitle: "Verwijderen?",
    deleteText: "Wil je deze invoer echt verwijderen?",
    delete: "Verwijderen",
    locationSharing: "Locatie delen",
    locationSharingInfo: "Je locatie wordt tijdens de begeleiding gedeeld.",
    locationStarting: "Locatie delen starten...",
    locationActive: "Locatie delen actief",
    locationDenied: "Locatie delen kon niet worden gestart.",
    locationUnavailable: "Locatie is momenteel niet beschikbaar.",
    locationStopped: "Locatie delen gestopt.",
    sendLocationSms: "📤 Locatie via sms versturen",
    sendLocationWhatsapp: "💬 Locatie via WhatsApp versturen",
    checkInTitle: "Is alles goed?",
    checkInText: "Het lijkt erop dat je geen vooruitgang meer boekt richting je bestemming. Bevestig alsjeblieft.",
    checkInConfirm: "✓ Ja, het gaat goed",
    select: "Selecteren",
    selected: "✓"
},

pl: {
    authSubtitle: "Zarejestruj się lub zaloguj.",
    register: "Rejestracja",
    login: "Zaloguj się",
    name: "IMIĘ I NAZWISKO",
    email: "E-MAIL",
    password: "HASŁO",
    phone: "NUMER TELEFONU",
    namePlaceholder: "Twoje imię",
    passwordPlaceholder: "Hasło",
    registerAccount: "Zarejestruj konto",
    forgotPassword: "Nie pamiętasz hasła?",
    subtitle: "Twoje bezpieczne dojście do domu",
    savedDestinations: "ZAPISANE MIEJSCA",
    or: "lub",
    newDestination: "NOWE MIEJSCE",
    addressPlaceholder: "Wpisz adres...",
    saveDestination: "✓ Zapisz miejsce",
    currentDestination: "Bieżące miejsce",
    changeDestination: "Zmień miejsce",
    openMaps: "🗺️ Otwórz trasę w Google Maps",
    trustedPeople: "ZAUFANE OSOBY",
    startJourney: "▶ Rozpocznij eskortę",
    journeyActive: "Eskorta aktywna",
    active: "● Eskorta aktywna",
    onWay: "Jesteś w drodze",
    arrival: "🏠 Dotarłem",
    account: "👤 Konto",
    editAccount: "Edytuj konto",
    logout: "Wyloguj się",
    saveChanges: "Zapisz zmiany",
    forgotPasswordTitle: "Nie pamiętam hasła",
    newPassword: "NOWE HASŁO",
    resetPassword: "Zmień hasło",
    settings: "⚙️ Ustawienia",
    language: "JĘZYK",
    savePlace: "📍 Zapisz miejsce",
    placeName: "NAZWA MIEJSCA",
    address: "ADRES",
    save: "✓ Zapisz",
    cancel: "Anuluj",
    addPerson: "👤 Dodaj osobę",
    savePerson: "＋ Zapisz osobę",
    arrived: "Dotarłeś",
    journeyFinished: "Twoja eskorta została zakończona.",
    done: "Gotowe",
    deleteTitle: "Usunąć?",
    deleteText: "Czy na pewno chcesz usunąć ten wpis?",
    delete: "Usuń",
    locationSharing: "Udostępnianie lokalizacji",
    locationSharingInfo: "Twoja lokalizacja jest udostępniana podczas eskorty.",
    locationStarting: "Uruchamianie lokalizacji...",
    locationActive: "Udostępnianie lokalizacji aktywne",
    locationDenied: "Nie można uruchomić udostępniania.",
    locationUnavailable: "Lokalizacja jest obecnie niedostępna.",
    locationStopped: "Udostępnianie lokalizacji zatrzymane.",
    sendLocationSms: "📤 Wyślij lokalizację SMS-em",
    sendLocationWhatsapp: "💬 Wyślij lokalizację przez WhatsApp",
    checkInTitle: "Czy wszystko w porządku?",
    checkInText: "Wygląda na to, że nie zbliżasz się już do celu. Potwierdź, proszę.",
    checkInConfirm: "✓ Tak, wszystko dobrze",
    select: "Wybierz",
    selected: "✓"
},

ru: {
    authSubtitle: "Зарегистрируйтесь или войдите.",
    register: "Регистрация",
    login: "Войти",
    name: "ИМЯ",
    email: "ЭЛЕКТРОННАЯ ПОЧТА",
    password: "ПАРОЛЬ",
    phone: "НОМЕР ТЕЛЕФОНА",
    namePlaceholder: "Ваше имя",
    passwordPlaceholder: "Пароль",
    registerAccount: "Зарегистрировать аккаунт",
    forgotPassword: "Забыли пароль?",
    subtitle: "Ваше сопровождение по дороге домой",
    savedDestinations: "СОХРАНЁННЫЕ МЕСТА",
    or: "или",
    newDestination: "НОВОЕ МЕСТО",
    addressPlaceholder: "Введите адрес...",
    saveDestination: "✓ Сохранить место",
    currentDestination: "Текущее место",
    changeDestination: "Изменить место",
    openMaps: "🗺️ Открыть маршрут в Google Maps",
    trustedPeople: "ДОВЕРЕННЫЕ ЛЮДИ",
    startJourney: "▶ Начать сопровождение",
    journeyActive: "Сопровождение активно",
    active: "● Сопровождение активно",
    onWay: "Вы в пути",
    arrival: "🏠 Прибыл",
    account: "👤 Аккаунт",
    editAccount: "Изменить аккаунт",
    logout: "Выйти",
    saveChanges: "Сохранить изменения",
    forgotPasswordTitle: "Забыли пароль",
    newPassword: "НОВЫЙ ПАРОЛЬ",
    resetPassword: "Изменить пароль",
    settings: "⚙️ Настройки",
    language: "ЯЗЫК",
    savePlace: "📍 Сохранить место",
    placeName: "НАЗВАНИЕ МЕСТА",
    address: "АДРЕС",
    save: "✓ Сохранить",
    cancel: "Отмена",
    addPerson: "👤 Добавить человека",
    savePerson: "＋ Сохранить человека",
    arrived: "Вы прибыли",
    journeyFinished: "Сопровождение завершено.",
    done: "Готово",
    deleteTitle: "Удалить?",
    deleteText: "Вы действительно хотите удалить эту запись?",
    delete: "Удалить",
    locationSharing: "Передача местоположения",
    locationSharingInfo: "Ваше местоположение передаётся во время сопровождения.",
    locationStarting: "Запуск передачи местоположения...",
    locationActive: "Передача местоположения активна",
    locationDenied: "Не удалось запустить передачу местоположения.",
    locationUnavailable: "Местоположение сейчас недоступно.",
    locationStopped: "Передача местоположения остановлена.",
    sendLocationSms: "📤 Отправить местоположение по SMS",
    sendLocationWhatsapp: "💬 Отправить местоположение через WhatsApp",
    checkInTitle: "Всё в порядке?",
    checkInText: "Похоже, ты больше не приближаешься к цели. Пожалуйста, подтверди.",
    checkInConfirm: "✓ Да, всё хорошо",
    select: "Выбрать",
    selected: "✓"
},

uk: {
    authSubtitle: "Зареєструйтеся або увійдіть.",
    register: "Реєстрація",
    login: "Увійти",
    name: "ІМ'Я",
    email: "ЕЛЕКТРОННА ПОШТА",
    password: "ПАРОЛЬ",
    phone: "НОМЕР ТЕЛЕФОНУ",
    namePlaceholder: "Ваше ім'я",
    passwordPlaceholder: "Пароль",
    registerAccount: "Зареєструвати акаунт",
    forgotPassword: "Забули пароль?",
    subtitle: "Ваш супровід дорогою додому",
    savedDestinations: "ЗБЕРЕЖЕНІ МІСЦЯ",
    or: "або",
    newDestination: "НОВЕ МІСЦЕ",
    addressPlaceholder: "Введіть адресу...",
    saveDestination: "✓ Зберегти місце",
    currentDestination: "Поточне місце",
    changeDestination: "Змінити місце",
    openMaps: "🗺️ Відкрити маршрут у Google Maps",
    trustedPeople: "ДОВІРЕНІ ЛЮДИ",
    startJourney: "▶ Почати супровід",
    journeyActive: "Супровід активний",
    active: "● Супровід активний",
    onWay: "Ви в дорозі",
    arrival: "🏠 Прибув",
    account: "👤 Акаунт",
    editAccount: "Редагувати акаунт",
    logout: "Вийти",
    saveChanges: "Зберегти зміни",
    forgotPasswordTitle: "Забутий пароль",
    newPassword: "НОВИЙ ПАРОЛЬ",
    resetPassword: "Змінити пароль",
    settings: "⚙️ Налаштування",
    language: "МОВА",
    savePlace: "📍 Зберегти місце",
    placeName: "НАЗВА МІСЦЯ",
    address: "АДРЕСА",
    save: "✓ Зберегти",
    cancel: "Скасувати",
    addPerson: "👤 Додати людину",
    savePerson: "＋ Зберегти людину",
    arrived: "Ви прибули",
    journeyFinished: "Ваш супровід завершено.",
    done: "Готово",
    deleteTitle: "Видалити?",
    deleteText: "Ви дійсно хочете видалити цей запис?",
    delete: "Видалити",
    locationSharing: "Передача місцезнаходження",
    locationSharingInfo: "Ваше місцезнаходження передається під час супроводу.",
    locationStarting: "Запуск передачі місцезнаходження...",
    locationActive: "Передача місцезнаходження активна",
    locationDenied: "Не вдалося запустити передачу.",
    locationUnavailable: "Місцезнаходження зараз недоступне.",
    locationStopped: "Передачу місцезнаходження зупинено.",
    sendLocationSms: "📤 Надіслати місцезнаходження через SMS",
    sendLocationWhatsapp: "💬 Надіслати місцезнаходження через WhatsApp",
    checkInTitle: "Все гаразд?",
    checkInText: "Схоже, ти більше не наближаєшся до мети. Будь ласка, підтверди.",
    checkInConfirm: "✓ Так, все добре",
    select: "Вибрати",
    selected: "✓"
},

tr: {
    authSubtitle: "Kayıt olun veya giriş yapın.",
    register: "Kayıt ol",
    login: "Giriş yap",
    name: "İSİM",
    email: "E-POSTA",
    password: "ŞİFRE",
    phone: "TELEFON NUMARASI",
    namePlaceholder: "Adınız",
    passwordPlaceholder: "Şifre",
    registerAccount: "Hesap oluştur",
    forgotPassword: "Şifrenizi mi unuttunuz?",
    subtitle: "Eve dönüş yolunda refakatçin",
    savedDestinations: "KAYDEDİLEN HEDEFLER",
    or: "veya",
    newDestination: "YENİ HEDEF",
    addressPlaceholder: "Adres girin...",
    saveDestination: "✓ Hedefi kaydet",
    currentDestination: "Mevcut hedef",
    changeDestination: "Hedefi değiştir",
    openMaps: "🗺️ Google Maps'te rotayı aç",
    trustedPeople: "GÜVENİLEN KİŞİLER",
    startJourney: "▶ Refakati başlat",
    journeyActive: "Refakat aktif",
    active: "● Refakat aktif",
    onWay: "Yoldasın",
    arrival: "🏠 Vardım",
    account: "👤 Hesap",
    editAccount: "Hesabı düzenle",
    logout: "Çıkış yap",
    saveChanges: "Değişiklikleri kaydet",
    forgotPasswordTitle: "Şifremi unuttum",
    newPassword: "YENİ ŞİFRE",
    resetPassword: "Şifreyi değiştir",
    settings: "⚙️ Ayarlar",
    language: "DİL",
    savePlace: "📍 Hedefi kaydet",
    placeName: "HEDEF ADI",
    address: "ADRES",
    save: "✓ Kaydet",
    cancel: "İptal",
    addPerson: "👤 Kişi ekle",
    savePerson: "＋ Kişiyi kaydet",
    arrived: "Vardınız",
    journeyFinished: "Refakatınız sona erdi.",
    done: "Tamam",
    deleteTitle: "Silinsin mi?",
    deleteText: "Bu kaydı gerçekten silmek istiyor musunuz?",
    delete: "Sil",
    locationSharing: "Konum paylaşımı",
    locationSharingInfo: "Konumunuz refakat sırasında paylaşılır.",
    locationStarting: "Konum paylaşımı başlatılıyor...",
    locationActive: "Konum paylaşımı aktif",
    locationDenied: "Konum paylaşımı başlatılamadı.",
    locationUnavailable: "Konum şu anda kullanılamıyor.",
    locationStopped: "Konum paylaşımı durduruldu.",
    sendLocationSms: "📤 Konumu SMS ile gönder",
    sendLocationWhatsapp: "💬 Konumu WhatsApp ile gönder",
    checkInTitle: "Her şey yolunda mı?",
    checkInText: "Hedefine doğru ilerlemiyor gibisin. Lütfen onayla.",
    checkInConfirm: "✓ Evet, iyiyim",
    select: "Seç",
    selected: "✓"
},

ar: {
    authSubtitle: "يرجى التسجيل أو تسجيل الدخول.",
    register: "تسجيل",
    login: "تسجيل الدخول",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    phone: "رقم الهاتف",
    namePlaceholder: "اسمك",
    passwordPlaceholder: "كلمة المرور",
    registerAccount: "تسجيل الحساب",
    forgotPassword: "هل نسيت كلمة المرور؟",
    subtitle: "مرافقتك في طريق العودة إلى المنزل",
    savedDestinations: "الوجهات المحفوظة",
    or: "أو",
    newDestination: "وجهة جديدة",
    addressPlaceholder: "أدخل العنوان...",
    saveDestination: "✓ حفظ الوجهة",
    currentDestination: "الوجهة الحالية",
    changeDestination: "تغيير الوجهة",
    openMaps: "🗺️ فتح المسار في خرائط Google",
    trustedPeople: "الأشخاص الموثوق بهم",
    startJourney: "▶ بدء المرافقة",
    journeyActive: "المرافقة نشطة",
    active: "● المرافقة نشطة",
    onWay: "أنت في الطريق",
    arrival: "🏠 لقد وصلت",
    account: "👤 الحساب",
    editAccount: "تعديل الحساب",
    logout: "تسجيل الخروج",
    saveChanges: "حفظ التغييرات",
    forgotPasswordTitle: "نسيت كلمة المرور",
    newPassword: "كلمة المرور الجديدة",
    resetPassword: "تغيير كلمة المرور",
    settings: "⚙️ الإعدادات",
    language: "اللغة",
    savePlace: "📍 حفظ الوجهة",
    placeName: "اسم الوجهة",
    address: "العنوان",
    save: "✓ حفظ",
    cancel: "إلغاء",
    addPerson: "👤 إضافة شخص",
    savePerson: "＋ حفظ الشخص",
    arrived: "لقد وصلت",
    journeyFinished: "انتهت المرافقة.",
    done: "تم",
    deleteTitle: "حذف؟",
    deleteText: "هل تريد حذف هذا الإدخال بالفعل؟",
    delete: "حذف",
    locationSharing: "مشاركة الموقع",
    locationSharingInfo: "تتم مشاركة موقعك أثناء المرافقة.",
    locationStarting: "جارٍ بدء مشاركة الموقع...",
    locationActive: "مشاركة الموقع نشطة",
    locationDenied: "تعذر بدء مشاركة الموقع.",
    locationUnavailable: "الموقع غير متاح حاليًا.",
    locationStopped: "تم إيقاف مشاركة الموقع.",
    sendLocationSms: "📤 إرسال الموقع عبر الرسائل النصية",
    sendLocationWhatsapp: "💬 إرسال الموقع عبر واتساب",
    checkInTitle: "هل ما زلت بخير؟",
    checkInText: "يبدو أنك لم تعد تتقدم نحو وجهتك. يرجى التأكيد.",
    checkInConfirm: "✓ نعم، أنا بخير",
    select: "اختيار",
    selected: "✓"
},

zh: {
    authSubtitle: "请注册或登录。",
    register: "注册",
    login: "登录",
    name: "姓名",
    email: "电子邮箱",
    password: "密码",
    phone: "电话号码",
    namePlaceholder: "你的姓名",
    passwordPlaceholder: "密码",
    registerAccount: "注册账户",
    forgotPassword: "忘记密码？",
    subtitle: "陪你安全回家",
    savedDestinations: "已保存的目的地",
    or: "或",
    newDestination: "新目的地",
    addressPlaceholder: "输入地址...",
    saveDestination: "✓ 保存目的地",
    currentDestination: "当前目的地",
    changeDestination: "更改目的地",
    openMaps: "🗺️ 在 Google 地图中打开路线",
    trustedPeople: "信任的人",
    startJourney: "▶ 开始陪伴",
    journeyActive: "陪伴进行中",
    active: "● 陪伴进行中",
    onWay: "你正在路上",
    arrival: "🏠 已到达",
    account: "👤 账户",
    editAccount: "编辑账户",
    logout: "退出登录",
    saveChanges: "保存更改",
    forgotPasswordTitle: "忘记密码",
    newPassword: "新密码",
    resetPassword: "修改密码",
    settings: "⚙️ 设置",
    language: "语言",
    savePlace: "📍 保存目的地",
    placeName: "目的地名称",
    address: "地址",
    save: "✓ 保存",
    cancel: "取消",
    addPerson: "👤 添加人员",
    savePerson: "＋ 保存人员",
    arrived: "你已到达",
    journeyFinished: "陪伴已结束。",
    done: "完成",
    deleteTitle: "删除？",
    deleteText: "确定要删除此项目吗？",
    delete: "删除",
    locationSharing: "位置共享",
    locationSharingInfo: "陪伴期间将共享你的位置。",
    locationStarting: "正在启动位置共享...",
    locationActive: "位置共享已开启",
    locationDenied: "无法启动位置共享。",
    locationUnavailable: "当前位置不可用。",
    locationStopped: "位置共享已停止。",
    sendLocationSms: "📤 通过短信发送位置",
    sendLocationWhatsapp: "💬 通过WhatsApp发送位置",
    checkInTitle: "你还好吗？",
    checkInText: "看起来你没有继续朝目的地前进。请确认。",
    checkInConfirm: "✓ 是的，我很好",
    select: "选择",
    selected: "✓"
},

ja: {
    authSubtitle: "登録またはログインしてください。",
    register: "登録",
    login: "ログイン",
    name: "名前",
    email: "メールアドレス",
    password: "パスワード",
    phone: "電話番号",
    namePlaceholder: "名前",
    passwordPlaceholder: "パスワード",
    registerAccount: "アカウントを登録",
    forgotPassword: "パスワードを忘れた場合",
    subtitle: "帰宅をサポートします",
    savedDestinations: "保存した目的地",
    or: "または",
    newDestination: "新しい目的地",
    addressPlaceholder: "住所を入力...",
    saveDestination: "✓ 目的地を保存",
    currentDestination: "現在の目的地",
    changeDestination: "目的地を変更",
    openMaps: "🗺️ Google Mapsでルートを開く",
    trustedPeople: "信頼できる人",
    startJourney: "▶ サポートを開始",
    journeyActive: "サポート中",
    active: "● サポート中",
    onWay: "移動中です",
    arrival: "🏠 到着しました",
    account: "👤 アカウント",
    editAccount: "アカウントを編集",
    logout: "ログアウト",
    saveChanges: "変更を保存",
    forgotPasswordTitle: "パスワードを忘れた場合",
    newPassword: "新しいパスワード",
    resetPassword: "パスワードを変更",
    settings: "⚙️ 設定",
    language: "言語",
    savePlace: "📍 目的地を保存",
    placeName: "目的地名",
    address: "住所",
    save: "✓ 保存",
    cancel: "キャンセル",
    addPerson: "👤 人を追加",
    savePerson: "＋ 人を保存",
    arrived: "到着しました",
    journeyFinished: "サポートが終了しました。",
    done: "完了",
    deleteTitle: "削除しますか？",
    deleteText: "この項目を本当に削除しますか？",
    delete: "削除",
    locationSharing: "位置情報の共有",
    locationSharingInfo: "サポート中は位置情報が共有されます。",
    locationStarting: "位置情報共有を開始しています...",
    locationActive: "位置情報共有中",
    locationDenied: "位置情報共有を開始できませんでした。",
    locationUnavailable: "現在位置を取得できません。",
    locationStopped: "位置情報共有を停止しました。",
    sendLocationSms: "📤 SMSで位置情報を送信",
    sendLocationWhatsapp: "💬 WhatsAppで位置情報を送信",
    checkInTitle: "大丈夫ですか？",
    checkInText: "目的地に向かって進んでいないようです。確認してください。",
    checkInConfirm: "✓ はい、大丈夫です",
    select: "選択",
    selected: "✓"
},

ko: {
    authSubtitle: "회원가입 또는 로그인을 해주세요.",
    register: "회원가입",
    login: "로그인",
    name: "이름",
    email: "이메일",
    password: "비밀번호",
    phone: "전화번호",
    namePlaceholder: "이름",
    passwordPlaceholder: "비밀번호",
    registerAccount: "계정 등록",
    forgotPassword: "비밀번호를 잊으셨나요?",
    subtitle: "집까지 안전하게 동행합니다",
    savedDestinations: "저장된 목적지",
    or: "또는",
    newDestination: "새 목적지",
    addressPlaceholder: "주소 입력...",
    saveDestination: "✓ 목적지 저장",
    currentDestination: "현재 목적지",
    changeDestination: "목적지 변경",
    openMaps: "🗺️ Google Maps에서 경로 열기",
    trustedPeople: "신뢰할 수 있는 사람",
    startJourney: "▶ 동행 시작",
    journeyActive: "동행 활성",
    active: "● 동행 활성",
    onWay: "이동 중입니다",
    arrival: "🏠 도착했습니다",
    account: "👤 계정",
    editAccount: "계정 편집",
    logout: "로그아웃",
    saveChanges: "변경사항 저장",
    forgotPasswordTitle: "비밀번호 찾기",
    newPassword: "새 비밀번호",
    resetPassword: "비밀번호 변경",
    settings: "⚙️ 설정",
    language: "언어",
    savePlace: "📍 목적지 저장",
    placeName: "목적지 이름",
    address: "주소",
    save: "✓ 저장",
    cancel: "취소",
    addPerson: "👤 사람 추가",
    savePerson: "＋ 사람 저장",
    arrived: "도착했습니다",
    journeyFinished: "동행이 종료되었습니다.",
    done: "완료",
    deleteTitle: "삭제할까요?",
    deleteText: "이 항목을 정말 삭제하시겠습니까?",
    delete: "삭제",
    locationSharing: "위치 공유",
    locationSharingInfo: "동행 중 위치가 공유됩니다.",
    locationStarting: "위치 공유를 시작하는 중...",
    locationActive: "위치 공유 활성",
    locationDenied: "위치 공유를 시작할 수 없습니다.",
    locationUnavailable: "현재 위치를 사용할 수 없습니다.",
    locationStopped: "위치 공유가 중지되었습니다.",
    sendLocationSms: "📤 SMS로 위치 보내기",
    sendLocationWhatsapp: "💬 WhatsApp로 위치 보내기",
    checkInTitle: "괜찮으신가요?",
    checkInText: "목적지 방향으로 더 이상 이동하지 않는 것 같습니다. 확인해 주세요.",
    checkInConfirm: "✓ 네, 괜찮습니다",
    select: "선택",
    selected: "✓"
},

hi: {
    authSubtitle: "कृपया पंजीकरण करें या लॉग इन करें।",
    register: "पंजीकरण",
    login: "लॉग इन",
    name: "नाम",
    email: "ई-मेल",
    password: "पासवर्ड",
    phone: "फोन नंबर",
    namePlaceholder: "आपका नाम",
    passwordPlaceholder: "पासवर्ड",
    registerAccount: "अकाउंट पंजीकृत करें",
    forgotPassword: "पासवर्ड भूल गए?",
    subtitle: "घर जाने में आपकी सहायता",
    savedDestinations: "सहेजे गए गंतव्य",
    or: "या",
    newDestination: "नया गंतव्य",
    addressPlaceholder: "पता दर्ज करें...",
    saveDestination: "✓ गंतव्य सहेजें",
    currentDestination: "वर्तमान गंतव्य",
    changeDestination: "गंतव्य बदलें",
    openMaps: "🗺️ Google Maps में मार्ग खोलें",
    trustedPeople: "विश्वसनीय लोग",
    startJourney: "▶ साथ शुरू करें",
    journeyActive: "साथ सक्रिय",
    active: "● साथ सक्रिय",
    onWay: "आप रास्ते में हैं",
    arrival: "🏠 पहुँच गया",
    account: "👤 अकाउंट",
    editAccount: "अकाउंट संपादित करें",
    logout: "लॉग आउट",
    saveChanges: "बदलाव सहेजें",
    forgotPasswordTitle: "पासवर्ड भूल गए",
    newPassword: "नया पासवर्ड",
    resetPassword: "पासवर्ड बदलें",
    settings: "⚙️ सेटिंग्स",
    language: "भाषा",
    savePlace: "📍 गंतव्य सहेजें",
    placeName: "गंतव्य का नाम",
    address: "पता",
    save: "✓ सहेजें",
    cancel: "रद्द करें",
    addPerson: "👤 व्यक्ति जोड़ें",
    savePerson: "＋ व्यक्ति सहेजें",
    arrived: "आप पहुँच गए हैं",
    journeyFinished: "आपका साथ समाप्त हो गया है।",
    done: "पूर्ण",
    deleteTitle: "हटाएँ?",
    deleteText: "क्या आप वाकई इस प्रविष्टि को हटाना चाहते हैं?",
    delete: "हटाएँ",
    locationSharing: "स्थान साझा करना",
    locationSharingInfo: "साथ के दौरान आपका स्थान साझा किया जाता है।",
    locationStarting: "स्थान साझा करना शुरू हो रहा है...",
    locationActive: "स्थान साझा करना सक्रिय",
    locationDenied: "स्थान साझा करना शुरू नहीं हो सका।",
    locationUnavailable: "स्थान अभी उपलब्ध नहीं है।",
    locationStopped: "स्थान साझा करना बंद कर दिया गया है।",
    sendLocationSms: "📤 एसएमएस से स्थान भेजें",
    sendLocationWhatsapp: "💬 व्हाट्सएप से स्थान भेजें",
    checkInTitle: "क्या आप ठीक हैं?",
    checkInText: "ऐसा लगता है कि आप अपने गंतव्य की ओर आगे नहीं बढ़ रहे हैं। कृपया पुष्टि करें।",
    checkInConfirm: "✓ हाँ, मैं ठीक हूं",
    select: "चुनें",
    selected: "✓"
}

};


/* =========================================
   HILFSFUNKTIONEN
========================================= */

function t(key) {

    return (
        translations[currentLanguage] &&
        translations[currentLanguage][key]
    ) ||
    translations.de[key] ||
    key;

}


function saveAccounts() {

    localStorage.setItem(
        "safewayAccounts",
        JSON.stringify(accounts)
    );

}


function loadAccounts() {

    const saved =
        localStorage.getItem("safewayAccounts");

    if (!saved) {
        accounts = {};
        return;
    }

    try {

        accounts = JSON.parse(saved) || {};

    } catch {

        accounts = {};

    }

}


/* =========================================
   ANGEMELDET BLEIBEN
========================================= */

function saveCurrentUserSession(email) {

    localStorage.setItem(
        "safewayCurrentUser",
        email
    );

}


function clearCurrentUserSession() {

    localStorage.removeItem(
        "safewayCurrentUser"
    );

}


/* =========================================
   SPRACHE
========================================= */

function applyLanguage() {

    document.documentElement.lang =
        currentLanguage;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(function(element) {

            const key =
                element.getAttribute("data-i18n");

            element.textContent =
                t(key);

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function(element) {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            element.placeholder =
                t(key);

        });


    document
        .querySelectorAll(".selectButton")
        .forEach(function(button) {

            if (
                button.dataset.selected === "true"
            ) {
                button.textContent =
                    t("selected");
            } else {
                button.textContent =
                    t("select");
            }

        });

}


document
    .getElementById("languageSelect")
    .addEventListener(
        "change",
        function() {

            currentLanguage =
                this.value;

            localStorage.setItem(
                "safewayLanguage",
                currentLanguage
            );

            applyLanguage();

            document
                .getElementById("settingsPopup")
                .classList.add("hidden");

        }
    );


/* =========================================
   AUTH UI
========================================= */

function showAuthScreen() {

    document
        .getElementById("authScreen")
        .classList.remove("hidden");

    document
        .getElementById("homeScreen")
        .classList.add("hidden");

    document
        .getElementById("journeyScreen")
        .classList.add("hidden");

}


function showHomeScreen() {

    document
        .getElementById("authScreen")
        .classList.add("hidden");

    document
        .getElementById("homeScreen")
        .classList.remove("hidden");

    document
        .getElementById("journeyScreen")
        .classList.add("hidden");

}


function switchAuthTab(mode) {

    const registerArea =
        document.getElementById("registerArea");

    const loginArea =
        document.getElementById("loginArea");

    const registerTab =
        document.getElementById("registerTab");

    const loginTab =
        document.getElementById("loginTab");


    if (mode === "register") {

        registerArea.classList.remove("hidden");
        loginArea.classList.add("hidden");

        registerTab.classList.add("active");
        loginTab.classList.remove("active");

    } else {

        registerArea.classList.add("hidden");
        loginArea.classList.remove("hidden");

        registerTab.classList.remove("active");
        loginTab.classList.add("active");

    }

}


document
    .getElementById("registerTab")
    .addEventListener(
        "click",
        function() {

            switchAuthTab("register");

        }
    );


document
    .getElementById("loginTab")
    .addEventListener(
        "click",
        function() {

            switchAuthTab("login");

        }
    );


/* =========================================
   REGISTRIEREN
========================================= */

document
    .getElementById("registerButton")
    .addEventListener(
        "click",
        function() {

            const name =
                document
                    .getElementById("registerName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            const phone =
                document
                    .getElementById("registerPhone")
                    .value
                    .trim();


            if (!name || !email || !password || !phone) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte alle Felder ausfüllen."
                        : "Please fill in all fields."
                );

                return;

            }


            if (accounts[email]) {

                alert(
                    currentLanguage === "de"
                        ? "Für diese E-Mail-Adresse existiert bereits ein Account."
                        : "An account with this email already exists."
                );

                return;

            }


            accounts[email] = {

                name: name,
                email: email,
                password: password,
                phone: phone,

                destinations: [],
                people: []

            };


            saveAccounts();


            loginAccount(
                accounts[email]
            );

        }
    );


/* =========================================
   ANMELDEN
========================================= */

document
    .getElementById("loginButton")
    .addEventListener(
        "click",
        function() {

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const savedAccount =
                accounts[email];


            if (
                !savedAccount ||
                savedAccount.password !== password
            ) {

                alert(
                    currentLanguage === "de"
                        ? "E-Mail oder Passwort ist falsch."
                        : "Email or password is incorrect."
                );

                return;

            }


            loginAccount(savedAccount);

        }
    );


/* =========================================
   ACCOUNT LOGIN
========================================= */

function loginAccount(savedAccount) {

    account =
        savedAccount;

    currentAccountEmail =
        savedAccount.email;


    destination =
        "";

    selectedDestinationIndex =
        null;

    destinations =
        Array.isArray(savedAccount.destinations)
            ? savedAccount.destinations
            : [];

    people =
        Array.isArray(savedAccount.people)
            ? savedAccount.people
            : [];

    selectedPeople = [];


    saveCurrentUserSession(
        savedAccount.email
    );


    updateAccountUI();

    renderDestinations();
    renderPeople();
    renderCurrentDestination();

    showHomeScreen();

}


/* =========================================
   ACCOUNT SPEICHERN
========================================= */

function saveCurrentAccount() {

    if (!account || !currentAccountEmail) {
        return;
    }


    accounts[currentAccountEmail] = {

        ...account,

        destinations:
            destinations,

        people:
            people

    };


    account =
        accounts[currentAccountEmail];


    saveAccounts();

}


/* =========================================
   ACCOUNT ANZEIGEN
========================================= */

function updateAccountUI() {

    if (!account) {
        return;
    }


    document
        .getElementById("profileName")
        .textContent =
        account.name;


    document
        .getElementById("profileEmail")
        .textContent =
        account.email;


    document
        .getElementById("profilePhone")
        .textContent =
        account.phone;

}


/* =========================================
   ACCOUNT ICON
========================================= */

document
    .getElementById("accountButton")
    .addEventListener(
        "click",
        function() {

            if (!account) {

                showAuthScreen();

                return;

            }


            updateAccountUI();

            document
                .getElementById("accountPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("closeAccountButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("accountPopup")
                .classList.add("hidden");

        }
    );


/* =========================================
   ACCOUNT BEARBEITEN
========================================= */

document
    .getElementById("editAccountButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("accountPopup")
                .classList.add("hidden");


            document
                .getElementById("editName")
                .value =
                account.name;


            document
                .getElementById("editEmail")
                .value =
                account.email;


            document
                .getElementById("editPassword")
                .value =
                account.password;


            document
                .getElementById("editPhone")
                .value =
                account.phone;


            document
                .getElementById("editAccountPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("closeEditAccountButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("editAccountPopup")
                .classList.add("hidden");

        }
    );


document
    .getElementById("saveAccountChangesButton")
    .addEventListener(
        "click",
        function() {

            const name =
                document
                    .getElementById("editName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("editEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("editPassword")
                    .value;

            const phone =
                document
                    .getElementById("editPhone")
                    .value
                    .trim();


            if (!name || !email || !password || !phone) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte alle Felder ausfüllen."
                        : "Please fill in all fields."
                );

                return;

            }


            if (
                email !== currentAccountEmail &&
                accounts[email]
            ) {

                alert(
                    currentLanguage === "de"
                        ? "Diese E-Mail-Adresse wird bereits verwendet."
                        : "This email address is already in use."
                );

                return;

            }


            const oldEmail =
                currentAccountEmail;


            const updatedAccount = {

                ...account,

                name,
                email,
                password,
                phone

            };


            delete accounts[oldEmail];

            accounts[email] =
                updatedAccount;


            account =
                updatedAccount;

            currentAccountEmail =
                email;


            saveAccounts();

            saveCurrentUserSession(
                email
            );

            updateAccountUI();


            document
                .getElementById("editAccountPopup")
                .classList.add("hidden");

        }
    );


/* =========================================
   ABMELDEN
========================================= */

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        function() {

            stopLocationSharing();


            account = null;

            currentAccountEmail = null;

            destination = "";

            selectedDestinationIndex = null;

            destinations = [];

            people = [];

            selectedPeople = [];


            clearCurrentUserSession();


            document
                .getElementById("accountPopup")
                .classList.add("hidden");


            document
                .getElementById("editAccountPopup")
                .classList.add("hidden");


            renderDestinations();
            renderPeople();
            renderCurrentDestination();

            showAuthScreen();

            switchAuthTab("login");

        }
    );


/* =========================================
   PASSWORT VERGESSEN
========================================= */

document
    .getElementById("forgotPasswordButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("forgotPasswordPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("forgotPasswordFromAccount")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("editAccountPopup")
                .classList.add("hidden");

            document
                .getElementById("forgotPasswordPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("closeForgotPasswordButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("forgotPasswordPopup")
                .classList.add("hidden");

        }
    );


document
    .getElementById("resetPasswordButton")
    .addEventListener(
        "click",
        function() {

            const email =
                document
                    .getElementById("forgotEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const newPassword =
                document
                    .getElementById("newPassword")
                    .value;


            if (!accounts[email]) {

                alert(
                    currentLanguage === "de"
                        ? "Kein Account mit dieser E-Mail-Adresse gefunden."
                        : "No account with this email was found."
                );

                return;

            }


            if (!newPassword) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte ein neues Passwort eingeben."
                        : "Please enter a new password."
                );

                return;

            }


            accounts[email].password =
                newPassword;


            saveAccounts();


            document
                .getElementById("forgotPasswordPopup")
                .classList.add("hidden");


            document
                .getElementById("forgotEmail")
                .value = "";

            document
                .getElementById("newPassword")
                .value = "";

        }
    );


/* =========================================
   PASSWORT ANZEIGEN / VERSTECKEN
========================================= */

document
    .querySelectorAll(".passwordToggle")
    .forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const input =
                        document.getElementById(
                            button.dataset.target
                        );


                    if (
                        input.type === "password"
                    ) {

                        input.type = "text";

                        button.textContent =
                            "🙈";

                    } else {

                        input.type = "password";

                        button.textContent =
                            "👁️";

                    }

                }
            );

        }
    );


/* =========================================
   EINSTELLUNGEN
========================================= */

document
    .getElementById("settingsButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("settingsPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("closeSettingsButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("settingsPopup")
                .classList.add("hidden");

        }
    );


/* =========================================
   ZIEL POPUP
========================================= */

document
    .getElementById("addDestinationButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("destinationPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("closeDestinationButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("destinationPopup")
                .classList.add("hidden");

        }
    );


document
    .getElementById("cancelDestinationButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("destinationPopup")
                .classList.add("hidden");

        }
    );


document
    .getElementById("saveNewDestinationButton")
    .addEventListener(
        "click",
        function() {

            const name =
                document
                    .getElementById("destinationName")
                    .value
                    .trim();

            const address =
                document
                    .getElementById("destinationAddress")
                    .value
                    .trim();


            if (!name || !address) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte Name und Adresse eingeben."
                        : "Please enter a name and address."
                );

                return;

            }


            destinations.push({

                name,
                address

            });


            saveCurrentAccount();

            renderDestinations();


            document
                .getElementById("destinationName")
                .value = "";

            document
                .getElementById("destinationAddress")
                .value = "";


            document
                .getElementById("destinationPopup")
                .classList.add("hidden");

        }
    );


/* =========================================
   ZIELE ANZEIGEN
========================================= */

function renderDestinations() {

    const list =
        document.getElementById(
            "destinationList"
        );


    list.innerHTML = "";


    if (!account || destinations.length === 0) {

        return;

    }


    destinations.forEach(
        function(item, index) {

            const row =
                document.createElement("div");

            row.className =
                "destinationItem" +
                (
                    selectedDestinationIndex === index
                        ? " selected"
                        : ""
                );


            const top =
                document.createElement("div");

            top.className =
                "destinationTop";


            const icon =
                document.createElement("div");

            icon.className =
                "destinationIcon";

            icon.textContent =
                "📍";


            const info =
                document.createElement("div");

            info.className =
                "destinationInfo";


            const strong =
                document.createElement("strong");

            strong.textContent =
                item.name;


            const span =
                document.createElement("span");

            span.textContent =
                item.address;


            info.appendChild(strong);
            info.appendChild(span);


            top.appendChild(icon);
            top.appendChild(info);


            const actions =
                document.createElement("div");

            actions.className =
                "destinationActions";


            const selectButton =
                document.createElement("button");

            selectButton.className =
                "smallButton selectButton";

            const isSelected =
                selectedDestinationIndex === index;


            selectButton.dataset.selected =
                isSelected
                    ? "true"
                    : "false";


            selectButton.textContent =
                isSelected
                    ? t("selected")
                    : t("select");


            selectButton.addEventListener(
                "click",
                function() {

                    selectedDestinationIndex =
                        index;

                    destination =
                        item.address;

                    renderCurrentDestination();
                    renderDestinations();

                }
            );


            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "deleteDestination";

            deleteButton.textContent =
                "×";

            deleteButton.title =
                t("delete");


            deleteButton.addEventListener(
                "click",
                function() {

                    askDelete(
                        "destination",
                        index
                    );

                }
            );


            actions.appendChild(selectButton);
            actions.appendChild(deleteButton);

            row.appendChild(top);
            row.appendChild(actions);

            list.appendChild(row);

        }
    );

}


/* =========================================
   AKTUELLES ZIEL
========================================= */

function renderCurrentDestination() {

    const input =
        document.getElementById(
            "destinationInput"
        );

    const saveButton =
        document.getElementById(
            "saveDestinationButton"
        );

    const currentBox =
        document.getElementById(
            "currentDestination"
        );

    const address =
        document.getElementById(
            "currentDestinationAddress"
        );


    if (!account || !destination) {

        input.classList.remove("hidden");

        saveButton.classList.remove("hidden");

        currentBox.classList.add("hidden");

        address.textContent = "";

        return;

    }


    input.classList.add("hidden");

    saveButton.classList.add("hidden");

    currentBox.classList.remove("hidden");

    address.textContent =
        destination;

}


/* =========================================
   NEUES ZIEL FÜR DIE AKTUELLE ROUTE
========================================= */

document
    .getElementById("saveDestinationButton")
    .addEventListener(
        "click",
        function() {

            const value =
                document
                    .getElementById("destinationInput")
                    .value
                    .trim();


            if (!value) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte zuerst ein Ziel eingeben."
                        : "Please enter a destination first."
                );

                return;

            }


            destination =
                value;

            selectedDestinationIndex =
                null;


            renderCurrentDestination();
            renderDestinations();

        }
    );


document
    .getElementById("changeDestinationButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("destinationInput")
                .value =
                destination;


            document
                .getElementById("destinationInput")
                .classList.remove("hidden");


            document
                .getElementById("saveDestinationButton")
                .classList.remove("hidden");


            document
                .getElementById("currentDestination")
                .classList.add("hidden");

        }
    );


function createMapsURL(ziel) {

    return (
        "https://www.google.com/maps/dir/?api=1" +
        "&destination=" +
        encodeURIComponent(ziel) +
        "&travelmode=walking"
    );

}


/* =========================================
   PERSONEN
========================================= */

document
    .getElementById("addPersonButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("personPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("closePersonButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("personPopup")
                .classList.add("hidden");

        }
    );


document
    .getElementById("cancelPersonButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("personPopup")
                .classList.add("hidden");

        }
    );


document
    .getElementById("savePersonButton")
    .addEventListener(
        "click",
        function() {

            const name =
                document
                    .getElementById("personName")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("personPhone")
                    .value
                    .trim();


            if (!name || !phone) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte Name und Telefonnummer eingeben."
                        : "Please enter name and phone number."
                );

                return;

            }


            people.push({

                name,
                phone

            });


            saveCurrentAccount();


            document
                .getElementById("personName")
                .value = "";

            document
                .getElementById("personPhone")
                .value = "";


            document
                .getElementById("personPopup")
                .classList.add("hidden");


            renderPeople();

        }
    );


/* =========================================
   PERSONEN ANZEIGEN
========================================= */

function renderPeople() {

    const list =
        document.getElementById(
            "peopleList"
        );


    list.innerHTML = "";


    if (!account || people.length === 0) {

        return;

    }


    people.forEach(
        function(person, index) {

            const row =
                document.createElement("div");

            row.className =
                "person" +
                (
                    selectedPeople.includes(index)
                        ? " selected"
                        : ""
                );


            const avatar =
                document.createElement("div");

            avatar.className =
                "avatar";

            avatar.textContent =
                "👤";


            const info =
                document.createElement("div");

            info.className =
                "personInfo";


            const name =
                document.createElement("strong");

            name.textContent =
                person.name;


            const phone =
                document.createElement("span");

            phone.textContent =
                person.phone;


            info.appendChild(name);
            info.appendChild(phone);


            const actions =
                document.createElement("div");

            actions.className =
                "personActions";


            const select =
                document.createElement("button");

            select.className =
                "smallButton selectButton";

            const isSelected =
                selectedPeople.includes(index);


            select.dataset.selected =
                isSelected
                    ? "true"
                    : "false";


            select.textContent =
                isSelected
                    ? t("selected")
                    : t("select");


            select.addEventListener(
                "click",
                function() {

                    if (
                        selectedPeople.includes(index)
                    ) {

                        selectedPeople =
                            selectedPeople.filter(
                                function(i) {
                                    return i !== index;
                                }
                            );

                    } else {

                        selectedPeople.push(index);

                    }


                    renderPeople();

                }
            );


            const remove =
                document.createElement("button");

            remove.className =
                "smallButton deleteButton";

            remove.textContent =
                "×";

            remove.title =
                t("delete");


            remove.addEventListener(
                "click",
                function() {

                    askDelete(
                        "person",
                        index
                    );

                }
            );


            actions.appendChild(select);
            actions.appendChild(remove);


            row.appendChild(avatar);
            row.appendChild(info);
            row.appendChild(actions);


            list.appendChild(row);

        }
    );

}


/* =========================================
   LÖSCHBESTÄTIGUNG
========================================= */

function askDelete(type, index) {

    deleteType =
        type;

    deleteIndex =
        index;


    document
        .getElementById("confirmDeletePopup")
        .classList.remove("hidden");

}


document
    .getElementById("cancelDeleteButton")
    .addEventListener(
        "click",
        function() {

            deleteType = null;
            deleteIndex = null;

            document
                .getElementById("confirmDeletePopup")
                .classList.add("hidden");

        }
    );


document
    .getElementById("confirmDeleteButton")
    .addEventListener(
        "click",
        function() {

            if (
                deleteType === "destination"
            ) {

                destinations.splice(
                    deleteIndex,
                    1
                );


                if (
                    selectedDestinationIndex === deleteIndex
                ) {

                    selectedDestinationIndex = null;

                    destination = "";

                } else if (
                    selectedDestinationIndex !== null &&
                    selectedDestinationIndex > deleteIndex
                ) {

                    selectedDestinationIndex =
                        selectedDestinationIndex - 1;

                }


                saveCurrentAccount();
                renderDestinations();
                renderCurrentDestination();

            }


            if (
                deleteType === "person"
            ) {

                people.splice(
                    deleteIndex,
                    1
                );


                selectedPeople =
                    selectedPeople
                        .filter(
                            function(i) {
                                return i !== deleteIndex;
                            }
                        )
                        .map(
                            function(i) {

                                return i > deleteIndex
                                    ? i - 1
                                    : i;

                            }
                        );


                saveCurrentAccount();
                renderPeople();

            }


            deleteType = null;
            deleteIndex = null;


            document
                .getElementById("confirmDeletePopup")
                .classList.add("hidden");

        }
    );


/* =========================================
   BEGLEITUNG STARTEN
========================================= */

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        function() {

            if (!account) {

                showAuthScreen();

                return;

            }


            if (!destination) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte zuerst ein Ziel speichern."
                        : "Please save a destination first."
                );

                return;

            }


            if (selectedPeople.length === 0) {

                alert(
                    currentLanguage === "de"
                        ? "Bitte mindestens eine Vertrauensperson auswählen."
                        : "Please select at least one trusted person."
                );

                return;

            }


            const selectedNames =
                selectedPeople
                    .map(
                        function(index) {

                            return people[index]
                                ? people[index].name
                                : "";

                        }
                    )
                    .filter(Boolean);


            document
                .getElementById("journeyDestination")
                .textContent =
                "📍 " +
                destination;


            document
                .getElementById("journeyPerson")
                .textContent =
                "👤 " +
                selectedNames.join(", ");


            document
                .getElementById("journeyMapsButton")
                .href =
                createMapsURL(destination);


            document
                .getElementById("homeScreen")
                .classList.add("hidden");


            document
                .getElementById("journeyScreen")
                .classList.remove("hidden");


            startLocationSharing();

            geocodeDestination(destination);

            sendLocationViaSms();

        }
    );


/* =========================================
   STANDORTFREIGABE
   1. Browser fragt nach Standortberechtigung
   2. Standort wird während der Begleitung überwacht
   3. Startzeit wird gespeichert
   4. Laufzeit wird angezeigt
   5. Standort wird beim Beenden gestoppt
   6. Status wird sichtbar angezeigt

   Hinweis:
   Diese Version teilt den Standort technisch
   noch nicht an einen Server. Dafür wäre ein
   Backend/WebSocket/WebRTC-System notwendig.
========================================= */

/* =========================================
   ROUTEN-ÜBERWACHUNG / CHECK-IN

   Beim Start der Begleitung wird die
   Zieladresse einmalig über die kostenlose
   OpenStreetMap-Nominatim-API in Koordinaten
   umgewandelt. Danach wird alle 30 Sekunden
   geprüft, ob der Abstand zum Ziel in den
   letzten 3 Minuten wirklich kleiner geworden
   ist. Falls nicht (z. B. Stillstand oder
   Bewegung vom Ziel weg), erscheint ein
   Check-in-Popup mit 3-Minuten-Countdown.
   Ohne Bestätigung wird automatisch die
   SMS-/WhatsApp-Nachricht mit dem Standort
   geöffnet.

   Hinweis:
   Dies ist keine echte Straßenrouten-
   Abweichungserkennung (dafür wäre eine
   kostenpflichtige Routing-API nötig),
   sondern eine Annäherung über den direkten
   Fortschritt zum Ziel.
========================================= */

async function geocodeDestination(address) {

    try {

        const response =
            await fetch(
                "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
                encodeURIComponent(address)
            );

        const results =
            await response.json();


        if (
            Array.isArray(results) &&
            results.length > 0
        ) {

            destinationCoords = {

                lat:
                    parseFloat(results[0].lat),

                lng:
                    parseFloat(results[0].lon)

            };

            startRouteMonitoring();

        } else {

            destinationCoords = null;

        }

    } catch {

        destinationCoords = null;

    }

}


function haversineDistanceMeters(lat1, lon1, lat2, lon2) {

    const earthRadius =
        6371000;

    const toRad =
        function(value) {
            return (value * Math.PI) / 180;
        };


    const deltaLat =
        toRad(lat2 - lat1);

    const deltaLon =
        toRad(lon2 - lon1);


    const a =
        Math.sin(deltaLat / 2) *
        Math.sin(deltaLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);


    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return earthRadius * c;

}


function recordProgress(latitude, longitude) {

    if (!destinationCoords) {
        return;
    }


    const distance =
        haversineDistanceMeters(
            latitude,
            longitude,
            destinationCoords.lat,
            destinationCoords.lng
        );


    progressHistory.push({

        time: Date.now(),
        distance: distance

    });


    const windowMs =
        4 * 60 * 1000;

    const cutoff =
        Date.now() - windowMs;

    progressHistory =
        progressHistory.filter(
            function(entry) {
                return entry.time >= cutoff;
            }
        );

}


function startRouteMonitoring() {

    if (routeCheckInterval !== null) {
        return;
    }


    routeCheckInterval =
        setInterval(
            checkRouteProgress,
            30000
        );

}


function stopRouteMonitoring() {

    if (routeCheckInterval !== null) {
        clearInterval(routeCheckInterval);
    }

    routeCheckInterval = null;

    destinationCoords = null;

    progressHistory = [];

    checkInCooldownUntil = null;


    if (checkInCountdownInterval !== null) {
        clearInterval(checkInCountdownInterval);
    }

    checkInCountdownInterval = null;

    checkInActive = false;

    checkInDeadline = null;


    document
        .getElementById("checkInPopup")
        .classList.add("hidden");

}


function checkRouteProgress() {

    if (!destinationCoords) {
        return;
    }

    if (checkInActive) {
        return;
    }

    if (
        checkInCooldownUntil &&
        Date.now() < checkInCooldownUntil
    ) {
        return;
    }


    const windowMs =
        3 * 60 * 1000;

    const windowStart =
        Date.now() - windowMs;

    const entriesInWindow =
        progressHistory.filter(
            function(entry) {
                return entry.time >= windowStart;
            }
        );


    if (entriesInWindow.length < 2) {
        return;
    }


    const oldest =
        entriesInWindow[0];

    const newest =
        entriesInWindow[entriesInWindow.length - 1];

    const improvement =
        oldest.distance - newest.distance;

    const progressThresholdMeters =
        30;


    if (improvement < progressThresholdMeters) {

        triggerCheckIn();

    }

}


function triggerCheckIn() {

    checkInActive = true;

    checkInDeadline =
        Date.now() + (3 * 60 * 1000);


    document
        .getElementById("checkInPopup")
        .classList.remove("hidden");


    updateCheckInCountdown();


    checkInCountdownInterval =
        setInterval(
            updateCheckInCountdown,
            1000
        );

}


function updateCheckInCountdown() {

    const remaining =
        Math.max(
            0,
            checkInDeadline - Date.now()
        );


    const totalSeconds =
        Math.ceil(remaining / 1000);

    const minutes =
        Math.floor(totalSeconds / 60);

    const seconds =
        totalSeconds % 60;


    document
        .getElementById("checkInCountdown")
        .textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");


    if (remaining <= 0) {

        resolveCheckIn(false);

    }

}


function resolveCheckIn(confirmed) {

    checkInActive = false;


    if (checkInCountdownInterval !== null) {
        clearInterval(checkInCountdownInterval);
    }

    checkInCountdownInterval = null;


    document
        .getElementById("checkInPopup")
        .classList.add("hidden");


    if (!confirmed) {

        sendLocationViaSms();

        sendLocationViaWhatsapp();

    }


    progressHistory = [];

    checkInCooldownUntil =
        Date.now() +
        (
            confirmed
                ? 3 * 60 * 1000
                : 10 * 60 * 1000
        );

}


document
    .getElementById("checkInConfirmButton")
    .addEventListener(
        "click",
        function() {

            resolveCheckIn(true);

        }
    );


function startLocationSharing() {

    const box =
        document.getElementById(
            "locationShareBox"
        );


    box.classList.remove("hidden");


    if (!navigator.geolocation) {

        return;

    }


    locationStartTime =
        Date.now();


    updateLocationTimer();


    locationTimerInterval =
        setInterval(
            updateLocationTimer,
            1000
        );


    watchId =
        navigator.geolocation.watchPosition(

            function(position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                currentJourney = {

                    latitude,
                    longitude,

                    timestamp:
                        Date.now()

                };


                recordProgress(
                    latitude,
                    longitude
                );

            },


            function() {

                /* Standort-Fehler werden bewusst
                   nicht mehr als Statustext angezeigt. */

            },

            {

                enableHighAccuracy: true,

                maximumAge: 5000,

                timeout: 10000

            }

        );

}


/* =========================================
   STANDORT PER SMS SENDEN

   Öffnet die native SMS-App des Geräts,
   bereits adressiert an die Telefonnummer(n)
   der ausgewählten Vertrauensperson(en), mit
   einem Google-Maps-Link zum aktuellen
   Standort im Nachrichtentext.

   Hinweis:
   Aus Sicherheitsgründen kann keine Website
   eine SMS lautlos und automatisch verschicken.
   Der Nutzer muss die vorausgefüllte Nachricht
   in seiner SMS-App selbst abschicken.
========================================= */

function getSelectedPhoneNumbers() {

    return selectedPeople
        .map(
            function(index) {

                return people[index]
                    ? people[index].phone
                    : "";

            }
        )
        .filter(Boolean);

}


function buildLocationMessage() {

    let mapsLink = "";

    if (currentJourney) {

        mapsLink =
            "https://www.google.com/maps?q=" +
            currentJourney.latitude +
            "," +
            currentJourney.longitude;

    }


    const intro =
        currentLanguage === "de"
            ? "Ich bin unterwegs zu " + destination
            : "I'm on my way to " + destination;

    const locationPart =
        mapsLink
            ? (
                currentLanguage === "de"
                    ? ". Mein Standort: "
                    : ". My location: "
            ) + mapsLink
            : "";


    return intro + locationPart;

}


function openLocationSmsLink() {

    const numbers =
        getSelectedPhoneNumbers();


    if (numbers.length === 0) {
        return;
    }


    const body =
        buildLocationMessage();

    const smsUrl =
        "sms:" +
        numbers.join(",") +
        "?&body=" +
        encodeURIComponent(body);


    let appOpened =
        false;

    function visibilityHandler() {

        if (document.hidden) {
            appOpened = true;
        }

    }

    document.addEventListener(
        "visibilitychange",
        visibilityHandler
    );


    window.location.href =
        smsUrl;


    setTimeout(
        function() {

            document.removeEventListener(
                "visibilitychange",
                visibilityHandler
            );


            if (!appOpened) {

                alert(
                    (
                        currentLanguage === "de"
                            ? "Die SMS-App konnte nicht automatisch geöffnet werden (funktioniert nur auf einem Smartphone). Bitte sende diese Nachricht manuell an " +
                              numbers.join(", ") +
                              ":\n\n"
                            : "The SMS app could not be opened automatically (only works on a smartphone). Please send this message manually to " +
                              numbers.join(", ") +
                              ":\n\n"
                    ) +
                    body
                );

            }

        },
        1200
    );

}


function sendLocationViaSms() {

    const numbers =
        getSelectedPhoneNumbers();


    if (numbers.length === 0) {
        return;
    }


    if (!navigator.geolocation) {

        openLocationSmsLink();

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            currentJourney = {

                latitude:
                    position.coords.latitude,

                longitude:
                    position.coords.longitude,

                timestamp:
                    Date.now()

            };


            openLocationSmsLink();

        },


        function() {

            openLocationSmsLink();

        },

        {

            enableHighAccuracy: true,

            maximumAge: 5000,

            timeout: 10000

        }

    );

}


document
    .getElementById("sendLocationButton")
    .addEventListener(
        "click",
        function() {

            sendLocationViaSms();

        }
    );


/* =========================================
   STANDORT PER WHATSAPP SENDEN

   Öffnet WhatsApp (App oder WhatsApp Web),
   bereits mit der Telefonnummer der
   ausgewählten Vertrauensperson(en) und einem
   Google-Maps-Link zum aktuellen Standort im
   Nachrichtentext vorausgefüllt.

   Hinweis:
   Auch hier gilt: Der Nutzer muss die
   vorausgefüllte Nachricht in WhatsApp selbst
   abschicken. Bei mehreren ausgewählten
   Personen wird für die erste Person direkt
   navigiert, für weitere Personen wird je ein
   zusätzliches Fenster geöffnet (kann vom
   Popup-Blocker verhindert werden).
========================================= */

function formatPhoneForWhatsapp(phone) {

    return phone.replace(
        /[^0-9]/g,
        ""
    );

}


function openLocationWhatsappLink() {

    const numbers =
        getSelectedPhoneNumbers();


    if (numbers.length === 0) {
        return;
    }


    const body =
        buildLocationMessage();


    const firstNumber =
        formatPhoneForWhatsapp(
            numbers[0]
        );

    const firstUrl =
        "https://wa.me/" +
        firstNumber +
        "?text=" +
        encodeURIComponent(body);


    let appOpened =
        false;

    function visibilityHandler() {

        if (document.hidden) {
            appOpened = true;
        }

    }

    document.addEventListener(
        "visibilitychange",
        visibilityHandler
    );


    window.location.href =
        firstUrl;


    for (
        let i = 1;
        i < numbers.length;
        i++
    ) {

        const number =
            formatPhoneForWhatsapp(
                numbers[i]
            );

        const url =
            "https://wa.me/" +
            number +
            "?text=" +
            encodeURIComponent(body);


        window.open(
            url,
            "_blank"
        );

    }


    setTimeout(
        function() {

            document.removeEventListener(
                "visibilitychange",
                visibilityHandler
            );


            if (!appOpened) {

                alert(
                    (
                        currentLanguage === "de"
                            ? "WhatsApp konnte nicht automatisch geöffnet werden. Bitte sende diese Nachricht manuell an " +
                              numbers.join(", ") +
                              ":\n\n"
                            : "WhatsApp could not be opened automatically. Please send this message manually to " +
                              numbers.join(", ") +
                              ":\n\n"
                    ) +
                    body
                );

            }

        },
        1200
    );

}


function sendLocationViaWhatsapp() {

    const numbers =
        getSelectedPhoneNumbers();


    if (numbers.length === 0) {
        return;
    }


    if (!navigator.geolocation) {

        openLocationWhatsappLink();

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            currentJourney = {

                latitude:
                    position.coords.latitude,

                longitude:
                    position.coords.longitude,

                timestamp:
                    Date.now()

            };


            openLocationWhatsappLink();

        },


        function() {

            openLocationWhatsappLink();

        },

        {

            enableHighAccuracy: true,

            maximumAge: 5000,

            timeout: 10000

        }

    );

}


document
    .getElementById("sendWhatsappButton")
    .addEventListener(
        "click",
        function() {

            sendLocationViaWhatsapp();

        }
    );


function updateLocationTimer() {

    if (!locationStartTime) {
        return;
    }


    const elapsed =
        Math.floor(
            (Date.now() -
                locationStartTime) / 1000
        );


    const minutes =
        Math.floor(
            elapsed / 60
        );

    const seconds =
        elapsed % 60;


    document
        .getElementById("locationTimer")
        .textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


function stopLocationSharing() {

    stopRouteMonitoring();


    if (
        watchId !== null &&
        navigator.geolocation
    ) {

        navigator.geolocation.clearWatch(
            watchId
        );

    }


    watchId = null;


    if (
        locationTimerInterval !== null
    ) {

        clearInterval(
            locationTimerInterval
        );

    }


    locationTimerInterval = null;

    locationStartTime = null;

    currentJourney = null;


    const box =
        document.getElementById(
            "locationShareBox"
        );


    if (box) {
        box.classList.add("hidden");
    }

}


/* =========================================
   ZURÜCK
========================================= */

document
    .getElementById("backButton")
    .addEventListener(
        "click",
        function() {

            stopLocationSharing();


            document
                .getElementById("journeyScreen")
                .classList.add("hidden");


            document
                .getElementById("homeScreen")
                .classList.remove("hidden");

        }
    );


/* =========================================
   ANKUNFT
========================================= */

document
    .getElementById("arrivalButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("arrivalPopup")
                .classList.remove("hidden");

        }
    );


document
    .getElementById("finishButton")
    .addEventListener(
        "click",
        function() {

            stopLocationSharing();


            document
                .getElementById("arrivalPopup")
                .classList.add("hidden");


            document
                .getElementById("journeyScreen")
                .classList.add("hidden");


            document
                .getElementById("homeScreen")
                .classList.remove("hidden");

        }
    );


/* =========================================
   POPUPS DURCH KLICK AUSSERHALB SCHLIESSEN
========================================= */

document
    .querySelectorAll(".overlay")
    .forEach(
        function(overlay) {

            overlay.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target !== overlay
                    ) {
                        return;
                    }


                    if (
                        overlay.id ===
                            "arrivalPopup" ||
                        overlay.id ===
                            "checkInPopup"
                    ) {
                        return;
                    }


                    overlay.classList.add(
                        "hidden"
                    );

                }
            );

        }
    );


/* =========================================
   START
========================================= */

loadAccounts();

document
    .getElementById("languageSelect")
    .value =
    currentLanguage;

applyLanguage();


/*
 * Ist auf diesem Gerät bereits ein Account
 * angemeldet (safewayCurrentUser gespeichert),
 * wird automatisch eingeloggt, ohne dass
 * E-Mail/Passwort erneut eingegeben werden
 * müssen. Andernfalls wird der Auth-Screen
 * angezeigt.
 */

const savedCurrentUserEmail =
    localStorage.getItem("safewayCurrentUser");

if (
    savedCurrentUserEmail &&
    accounts[savedCurrentUserEmail]
) {

    loginAccount(
        accounts[savedCurrentUserEmail]
    );

} else {

    showAuthScreen();

    switchAuthTab("login");

}
