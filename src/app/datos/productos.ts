export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: 'Alimento para perros',
    categoria: 'Alimentación',
    descripcion: 'Alimento nutritivo para perros adultos.',
    precio: 1250,
    imagen: 'assets/productos/perro.png'
  },
  {
    id: 2,
    nombre: 'Alimento para gatos',
    categoria: 'Alimentación',
    descripcion: 'Nutrición balanceada para gatos.',
    precio: 950,
    imagen: 'assets/productos/gato.png'
  },
  {
    id: 3,
    nombre: 'Juguete para perros',
    categoria: 'Entretenimiento',
    descripcion: 'Diversión para tu mejor amigo.',
    precio: 350,
    imagen: 'assets/productos/juguete.png'
  },
  {
    id: 4,
    nombre: 'Collar ajustable',
    categoria: 'Accesorios',
    descripcion: 'Cómodo, resistente y ajustable.',
    precio: 450,
    imagen: 'assets/productos/collar.png'
  },
  {
    id: 5,
    nombre: 'Champú para mascotas',
    categoria: 'Higiene',
    descripcion: 'Limpieza y cuidado del pelaje.',
    precio: 550,
    imagen: 'assets/productos/champu.png'
  },
  {
    id: 6,
    nombre: 'Cama para mascotas',
    categoria: 'Descanso',
    descripcion: 'Un lugar cómodo para descansar.',
    precio: 1800,
    imagen: 'assets/productos/cama.png'
  }
];