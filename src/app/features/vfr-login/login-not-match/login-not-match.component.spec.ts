import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginNotMatchComponent} from './login-not-match.component';

describe('LoginComponent', () => {
  let component: LoginNotMatchComponent;
  let fixture: ComponentFixture<LoginNotMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginNotMatchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginNotMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
