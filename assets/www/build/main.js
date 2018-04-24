webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_fcm__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__trip_details_trip_details__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(menuCtrl, plt, fcm, alertCtrl, navCtrl, httpClient, loadingCtrl) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.plt = plt;
        this.fcm = fcm;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.httpClient = httpClient;
        this.loadingCtrl = loadingCtrl;
        //Login variables
        this.loggedIn = false;
        if (localStorage.getItem('loggedIn') != undefined || localStorage.getItem('loggedIn') != null || localStorage.getItem('loggedIn') == "true") {
            this.loggedIn = true;
            this.id = localStorage.getItem('id');
            this.token = localStorage.getItem('token');
            this.name = localStorage.getItem('name');
            this.email_validation = localStorage.getItem('email_validation');
            this.refresh();
        }
        if (plt.is('ios') || plt.is('android') && this.loggedIn == true) {
            this.fcm.getToken().then(function (token) {
                _this.registerToken(token);
            });
            this.fcm.onNotification().subscribe(function (data) {
                if (data.wasTapped) {
                    console.log("Received in background");
                }
                else {
                    console.log("Received in foreground");
                }
                ;
            });
            this.fcm.onTokenRefresh().subscribe(function (token) {
                _this.registerToken(token);
            });
        }
    }
    HomePage.prototype.login = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Connexion en cours..."
        });
        loader.present();
        this.response = this.httpClient.get('https://voisibus.fr/api/login/index.php?email=' + this.email + '&password=' + this.password);
        this.response
            .subscribe(function (data) {
            if (data.status == "success") {
                _this.loggedIn = true;
                //Store session info on local device
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('id', data.id);
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.name);
                localStorage.setItem('email_validation', data.email_validation);
                //Set local Variables
                _this.id = localStorage.getItem('id');
                _this.token = localStorage.getItem('token');
                _this.name = localStorage.getItem('name');
                _this.email_validation = localStorage.getItem('email_validation');
                _this.refresh();
            }
            else if (data.status == 'error_2') {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Oh non !',
                    subTitle: 'Le mot de passe ou l\'adresse e-mail saisie ne correspondent pas !',
                    buttons: ['OK']
                });
                alert_1.present();
            }
        });
        loader.dismiss();
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Se déconnecter ?',
            message: "Attention ! Si vous vous déconnectez, vous ne recevrez plus de notification de la part de la plateforme !",
            buttons: [
                {
                    text: 'Annuler',
                    handler: function () {
                    }
                },
                {
                    text: 'Se déconnecter quand même',
                    handler: function () {
                        if (_this.plt.is('ios') || _this.plt.is('android')) {
                            _this.registerToken('');
                        }
                        _this.loggedIn = false;
                        localStorage.clear();
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage.prototype.registerToken = function (regToken) {
        var loader = this.loadingCtrl.create({
            content: "Enregistrement de votre appareil..."
        });
        loader.present();
        this.response = this.httpClient.get('https://voisibus.fr/api/registrationID.php?where=' + this.id + '&regid=' + regToken + '&token=' + this.token);
        this.response
            .subscribe(function (data) {
            console.log('Registration id response:' + data);
            loader.dismiss();
        });
        loader.dismiss();
    };
    HomePage.prototype.getTrips = function () {
        var _this = this;
        this.response = this.httpClient.get('https://voisibus.fr/api/get/own_active_trips.php?id=' + this.id + '&token=' + this.token);
        this.response
            .subscribe(function (data) {
            if (data.status == "error_1") {
                console.log("Session expiré !");
            }
            else {
                _this.my_trips = data;
            }
        });
    };
    HomePage.prototype.forceLogout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Vous avez été déconnecté !',
            message: "Votre session n'est plus valide, veuillez vous reconnecter.",
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        if (_this.plt.is('ios') || _this.plt.is('android')) {
                            _this.registerToken('');
                        }
                        _this.loggedIn = false;
                        localStorage.clear();
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage.prototype.getInformations = function () {
        var _this = this;
        this.response = this.httpClient.get('https://voisibus.fr/api/get/informations.php?id=' + this.id + '&token=' + this.token);
        this.response
            .subscribe(function (data) {
            if (data.status == "error_2") {
                _this.forceLogout();
            }
            else {
                _this.informations = data;
            }
        });
    };
    HomePage.prototype.refresh = function () {
        var loader = this.loadingCtrl.create({
            content: "Veuillez patienter..."
        });
        loader.present();
        this.getTrips();
        this.getInformations();
        this.getMyTravelers();
        loader.dismiss();
    };
    HomePage.prototype.notAvailable = function () {
        var alert = this.alertCtrl.create({
            title: 'Oh non !',
            subTitle: 'Désolé, cette option n\'est pas enore disponible !',
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.doRefresh = function (refresher) {
        this.refresh();
        refresher.complete();
    };
    HomePage.prototype.availableOnWebSite = function () {
        var alert = this.alertCtrl.create({
            title: 'Oh non !',
            subTitle: 'Désolé, cette option n\'est pas enore disponible sur l\'application. Veuillez effectuer cette action via notre plateforme en ligne voisibus.fr !',
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.accept = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Veuillez patienter..."
        });
        loader.present();
        this.response = this.httpClient.get('https://voisibus.fr/api/do/manage_trip_request.php?trip_request_id=' + id + '&userid=' + this.id + '&token=' + this.token + '&action=accept');
        this.response
            .subscribe(function (data) {
            console.log(data);
            _this.refresh();
            loader.dismiss();
        });
    };
    HomePage.prototype.decline = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Veuillez patienter..."
        });
        loader.present();
        this.response = this.httpClient.get('https://voisibus.fr/api/do/manage_trip_request.php?trip_request_id=' + id + '&userid=' + this.id + '&token=' + this.token + '&action=refuse');
        this.response
            .subscribe(function (data) {
            console.log(data);
            _this.refresh();
            loader.dismiss();
        });
    };
    HomePage.prototype.getMyTravelers = function () {
        var _this = this;
        this.response = this.httpClient.get('https://voisibus.fr/api/get/persons.php?userid=' + this.id + '&token=' + this.token);
        this.response
            .subscribe(function (data) {
            _this.travelers = data;
        });
    };
    HomePage.prototype.openTrip = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__trip_details_trip_details__["a" /* TripDetailsPage */], {
            id: id,
            userid: this.id,
            user_token: this.token
        });
    };
    HomePage.prototype.welcome = function () {
        var alert = this.alertCtrl.create({
            title: 'Aïe !',
            subTitle: 'N\'appuyez pas trop fort, ça fait mal !',
            buttons: ['Oui désolé...']
        });
        alert.present();
    };
    HomePage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\lucie\Desktop\VoisibusCovoiturageApplication\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button (click)="toggleMenu()" icon-only *ngIf="loggedIn">\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Voisibus Covoiturage\n    </ion-title>\n    <ion-buttons *ngIf="loggedIn" end>\n      <button ion-button icon-only (click)="logout()">\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <!-- User logged in -->\n  <div *ngIf="loggedIn; else showLogin">\n\n    <ion-card style="background-color: #4a7b9d;">\n      <ion-card-header>\n        <span class="card-title">Informations</span>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-card (click)="welcome()" padding style="background-color: #54577c;">\n          <h2 style="text-align: center; color: white; font-size: 15px;">Bienvenue, {{ name }}</h2>\n        </ion-card>\n        <ion-card padding style="background-color: #54577c;" *ngFor="let info of informations">\n          <h2 style="text-align: center; color: white;font-size: 14px;"><b>{{ info.name }}</b> est intéressé par l\'un de vos trajets</h2>\n          <p style="text-align: center; color: white; font-size: 12px;">\n            {{ info.trip }}\n            <br>\n            <button ion-button small outline color="green" (click)="accept(info.id)">Accepter</button>\n            <a style="color: white;" href="tel:{{ info.phone }}" small clear ion-button icon-only>\n              <ion-icon name="call"></ion-icon>\n            </a>\n            <button ion-button outline small color="danger" (click)="decline(info.id)">Refuser</button>\n          </p>\n        </ion-card>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card style="background-color: #9aa899;">\n      <ion-card-header>\n        <span class="card-title">Mes trajets</span>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-list>\n          <button style="background-color: #70776f;" (click)="openTrip(trip.id)" ion-item *ngFor="let trip of my_trips">\n            <span style="color: white; font-size: 12px;">{{ trip.title }}</span>\n            <div item-end style="color: white; font-size: 12px;" *ngIf="trip.status == \'false\'">Trajet Désactivé</div>\n            <div item-end style="color: white; font-size: 12px;" *ngIf="trip.status == \'true\'">Trajet Activé</div>\n          </button>\n        </ion-list>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card style="background-color: #54577c;" *ngIf="travelers != \'\'">\n      <ion-card-header>\n        <span class="card-title">Mes passagers</span>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-card padding style="background-color: #4a7b9d;" *ngFor="let traveler of travelers">\n          <h5 style="text-align: center; color: white; font-size: 14px;"><b>{{ traveler.name }} {{ traveler.familyname }}</b></h5>\n          <p style="text-align: center; color: white; font-size: 12px;">\n            {{ traveler.title }}\n            <br>\n            <a ion-button small outline href="tel:{{ traveler.phone }}" color="secondary">Appeler</a>\n          </p>\n        </ion-card>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card padding>\n      <p style="text-align: center;">Que souhaiteriez vous voir de plus sur notre appli ? Faites nous part de vos remarque en rejoingnant notre serveur de discussion 👉<a href="https://discord.gg/ffEJrQ2">https://discord.gg/ffEJrQ2</a> !</p>\n    </ion-card>\n\n  </div>\n\n  <!-- User NOT logged in -->\n  <ng-template #showLogin>\n    <ion-item>\n      <ion-label floating>E-mail</ion-label>\n      <ion-input [(ngModel)]="email" type="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Mot de passe</ion-label>\n      <ion-input [(ngModel)]="password" type="password"></ion-input>\n    </ion-item>\n    <br>\n    <button class="center" ion-button outline (click)="login()">SE CONNECTER</button>\n    <button class="center" color="light" (click)="notAvailable()" ion-button clear>OU S\'INSCRIRE</button>\n  </ng-template>\n</ion-content>\n'/*ion-inline-end:"C:\Users\lucie\Desktop\VoisibusCovoiturageApplication\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_fcm__["a" /* FCM */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TripDetailsPage = /** @class */ (function () {
    function TripDetailsPage(httpClient, navCtrl, navParams) {
        this.httpClient = httpClient;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.trip_id = "Chargement...";
        this.stops = [];
        this.hours = [];
        this.realTime = [];
        this.trip_id = navParams.get('id');
        this.id = navParams.get('userid');
        this.token = navParams.get('user_token');
        this.loadData();
    }
    TripDetailsPage.prototype.loadData = function () {
        var _this = this;
        this.response = this.httpClient.get('https://voisibus.fr/api/get/trip_details.php?trip=' + this.trip_id + '&id=' + this.id + '&token=' + this.token);
        this.response
            .subscribe(function (data) {
            _this.trip_details = data;
            _this.stops = JSON.parse(JSON.stringify(_this.trip_details))[0].stops.split(';');
            _this.hours = JSON.parse(JSON.stringify(_this.trip_details))[0].intervals.split(';');
            var time = JSON.parse(JSON.stringify(_this.trip_details))[0].hour.split(':');
            _this.seconds = (+time[0]) * 60 * 60 + (+time[1]) * 60;
            for (var i = 0; i < _this.hours.length; i++) {
                _this.seconds = Number(_this.seconds) + Number(_this.hours[i]);
                _this.realTime.push(_this.secondsToHms(_this.seconds));
            }
        });
    };
    TripDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TripDetailsPage');
    };
    TripDetailsPage.prototype.secondsToHms = function (d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        //var s = Math.floor(d % 3600 % 60);
        var hDisplay = h + ":";
        var mDisplay = m == 0 ? "00" : m;
        //var sDisplay = s;
        return hDisplay + mDisplay;
    };
    TripDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trip-details',template:/*ion-inline-start:"C:\Users\lucie\Desktop\VoisibusCovoiturageApplication\src\pages\trip-details\trip-details.html"*/'<!--\n  Generated template for the TripDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Détails</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card *ngFor="let trip of trip_details">\n    <ion-card-header>\n      {{ trip.title }}\n    </ion-card-header>\n    <ion-card-content>\n      <ion-item>\n        <ion-icon name="time" item-start large></ion-icon>\n        <h2>Départ</h2>\n        <p>{{ trip.hour }}</p>\n      </ion-item>\n\n      <div *ngFor="let stop of stops; let i = index">\n        <ion-card padding *ngIf="i != (stops.length - 1)">\n            <p style="float: left;" *ngIf="i == 0"><b><ion-icon style="margin-right: 20px;" name="ios-pin"></ion-icon>{{ stop }}</b></p>\n            <p style="float: left;" *ngIf="i != 0 && (stops.length - 2) != i"><ion-icon style="margin-right: 20px;" name="arrow-round-down"></ion-icon>{{ stop }}</p>\n            <p style="float: left;" *ngIf="(stops.length - 2) == i"><b><ion-icon style="margin-right: 20px;" name="ios-pin-outline"></ion-icon>{{ stop }}</b></p>\n            <p style="float: right;">{{ realTime[i] }}</p>\n        </ion-card>\n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\lucie\Desktop\VoisibusCovoiturageApplication\src\pages\trip-details\trip-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], TripDetailsPage);
    return TripDetailsPage;
}());

//# sourceMappingURL=trip-details.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_fcm__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_trip_details_trip_details__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_trip_details_trip_details__["a" /* TripDetailsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {
                    mode: 'ios'
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_trip_details_trip_details__["a" /* TripDetailsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_fcm__["a" /* FCM */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.styleDefault();
            statusBar.backgroundColorByHexString('#102027');
            splashScreen.hide();
        });
    }
    MyApp.prototype.openHome = function () {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\lucie\Desktop\VoisibusCovoiturageApplication\src\app\app.html"*/'<ion-menu [content]="drawer">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list no-lines>\n      <button ion-item (click)="openHome()">\n        Accueil\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav #drawer [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\lucie\Desktop\VoisibusCovoiturageApplication\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map