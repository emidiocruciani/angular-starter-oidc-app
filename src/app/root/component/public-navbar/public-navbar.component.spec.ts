import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicNavbarComponent } from './public-navbar.component';
import { ConfigService } from '@app/core/config/service/config.service';
import { configStubFactory } from '@app/core/testing/mock-factories-registry.spec';

describe('PublicNavbarComponent', () => {
  let component: PublicNavbarComponent;
  let fixture: ComponentFixture<PublicNavbarComponent>;
  let router: Router;
  let config: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PublicNavbarComponent],
      providers: [
        { provide: ConfigService, useFactory: configStubFactory },
      ]
    });

    router = TestBed.inject(Router);
    config = TestBed.inject(ConfigService);

    spyOn(router, 'navigateByUrl').and.stub();

    fixture = TestBed.createComponent(PublicNavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('links', () => {
    let routerLinks: RouterLink[];

    beforeEach(() => {
      const elements: DebugElement[] = fixture.debugElement.queryAll(By.directive(RouterLink));
      routerLinks = elements.map(element => element.injector.get(RouterLink));
    });

    it('should have a router link', () => {
      expect(routerLinks.length).toBe(1);
    });

    it('first link should be public home', () => {
      expect(routerLinks[0].href).toBe('/home');
    });

    it('contains login link', () => {
      const loginButtonContainer: DebugElement = fixture.debugElement.query(By.css('.login-button-container'));
      expect(loginButtonContainer).toBeTruthy();

      const loginButton: DebugElement = loginButtonContainer.query(By.css('a'));
      expect(loginButton).toBeTruthy();
    });

    it('login link should call login()', () => {
      spyOn(component, 'login').and.callThrough();

      const loginButtonContainer: DebugElement = fixture.debugElement.query(By.css('.login-button-container'));
      const loginButton: DebugElement = loginButtonContainer.query(By.css('a'));
      loginButton.nativeElement.click();

      expect(component.login).toHaveBeenCalledTimes(1);
    });
  });

  describe('login()', () => {

    it('should redirect to login page', () => {
      component.login();

      expect(router.navigateByUrl).toHaveBeenCalledWith(config.loginUri);
    });
  });
});
