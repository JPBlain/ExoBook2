import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuController, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-auth',
  templateUrl: './auth.html'
})
export class AuthPage implements OnInit {

  mode : string;
  errorMessage : string;
  authForm : FormGroup;

  constructor(private menuCtrl: MenuController,
              private navCtrl: NavController,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private navParams: NavParams) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.mode === 'new') {
      this.authService.signUpUser(email, password).then(
        () => {this.navCtrl.setRoot(TabsPage);},
        (error) => {this.errorMessage = error;}
      );
    } else if (this.mode === 'connect') {
      this.authService.signInUser(email, password).then(
        () => {this.navCtrl.setRoot(TabsPage);},
        (error) => {this.errorMessage = error;}
      );
    }
  }

}

// L'authentification sera gérée par un service AuthService.
// L'utilisateur devra être authentifié pour accéder à l'application.
// L'utilisateur pourra également se déconnecter de l'application.
