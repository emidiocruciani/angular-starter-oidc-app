import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BasePublicPageComponent } from './base-public-page.component';

@Component({ selector: 'app-public-navbar', template: '' })
class PublicNavbarStubComponent {
}

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {
}

describe('BasePublicPageComponent', () => {
  let component: BasePublicPageComponent;
  let fixture: ComponentFixture<BasePublicPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        BasePublicPageComponent, 
        PublicNavbarStubComponent, 
        RouterOutletStubComponent,
      ]
    });

    fixture = TestBed.createComponent(BasePublicPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contain router-outlet', () => {
      const routerOutletElement: DebugElement = fixture.debugElement.query(By.directive(RouterOutletStubComponent));
      expect(routerOutletElement.nativeElement).toBeTruthy();
    });

    it('should contain app-public-navbar', () => {
      const publicNavbarElement: DebugElement = fixture.debugElement.query(By.directive(PublicNavbarStubComponent));
      expect(publicNavbarElement.nativeElement).toBeTruthy();
    });
  });
});
