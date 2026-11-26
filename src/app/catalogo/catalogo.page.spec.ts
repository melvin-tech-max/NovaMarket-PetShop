import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoPage } from './catalogo.page';
import { describe, beforeEach, it, expect } from 'vitest';

describe('CatalogoPage', () => {
  let component: CatalogoPage;
  let fixture: ComponentFixture<CatalogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});