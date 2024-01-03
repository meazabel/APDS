import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UsersNonVerifiedComponent} from './users-non-verified.component';

describe('UsersNonVerifiedComponent', () => {
  let component: UsersNonVerifiedComponent;
  let fixture: ComponentFixture<UsersNonVerifiedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersNonVerifiedComponent]
    });
    fixture = TestBed.createComponent(UsersNonVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
