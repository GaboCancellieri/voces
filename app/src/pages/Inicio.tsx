import { NavBar, Typography } from '../components';
import { colors } from '../utils/theme';
import logo from '../logo.png';
import { Carousel } from 'primereact/carousel';

function Inicio() {
  const novedades: any[] = [
    {
      name: 'imagen',
      image:
        'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  const itemTemplate = (product: any) => {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <img
            src={product.image}
            onError={(e) => null}
            alt={product.name}
            className="product-image"
          />
        </div>
      </div>
    );
  };
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  return (
    <>
      <NavBar />
      <div className="App">
        <div
          className="flex flex-row flex-wrap justify-content-center"
          style={{
            margin: '2rem 0 0 2rem',
          }}
        >
          <div
            className="flex align-items-center justify-content-end"
            style={{ flex: 1, paddingRight: '3rem' }}
          >
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div
            className="flex align-items-center justify-content-start"
            style={{ flex: 2, paddingLeft: '3rem' }}
          >
            <div style={{ width: '50vw' }}>
              <Typography
                align="justify"
                size={16}
                fontVariant="text"
                color={colors.mainWhite}
              >
                <p>
                  VOCES Escuela de Canto nació en el 2017 en la ciudad de
                  Cipolletti, Río Negro, pero fue un proyecto elaborado con
                  mucha anterioridad. Es una escuela específicamente de Canto
                  que adapta también otras actividades que hacen a la profesión
                  del cantante. Contamos con un plantel docente integral:
                  Cantantes, profesores de canto, profesores de Teatro
                  (interpretación vocal), Músicos profesionales, profesores de
                  instrumentos, audioperceptiva, armonía y de danza. También
                  tenemos un grupo de músicos fijos compuesto por intérpretes en
                  : Guitarras, Bajo, Batería y percusión, Teclado y piano y
                  Saxos. El Objetivo de la institución es FORMATIVO, los alumnos
                  aprenden y disfrutan de las actividades, pero principalmente
                  aprenden. Buscamos que nuestros alumnos comprendan la
                  importancia del estudio, de la formación profesional y que
                  adviertan que solo se llega al éxito con trabajo, esfuerzo,
                  perseverancia, estudio y VOCACIÓN. Brindamos a la comunidad en
                  general, a partir de los 7 años de edad, diferentes
                  actividades, todas directamente relacionadas al CANTO y
                  generamos performances para que los alumnos tengan la
                  posibilidad de demostrar sus talentos varias veces al año.
                  Trabajamos todas las técnicas vocales, y las adaptamos a la
                  necesidad de los estudiantes, sus niveles y sus edades.
                  Generamos seminarios extracurriculares con docentes de primer
                  nivel que trabajan de forma particular y general y realizan un
                  proceso con cada alumno que participa. Somos una institución
                  que valora el esfuerzo y el acompañamiento de las familias con
                  sus hijos, padres y hermanos artistas. Nuestra escuela es una
                  gran familia de talentos, de emociones, de saberes. Sabemos
                  interpretar la necesidad de nuestros alumnos y sostenemos su
                  proceso.
                </p>
              </Typography>
            </div>
          </div>
        </div>
        <div
          className="flex flex-row flex-wrap justify-content-center"
          style={{
            margin: '2rem 0 0 0',
          }}
        >
          <Typography align="center" size={80} color={colors.mainPink}>
            NOVEDADES
          </Typography>
        </div>
        <div
          className="flex flex-row flex-wrap justify-content-center"
          style={{
            margin: '0 0 0 2rem',
          }}
        >
          <div className="carousel-demo">
            <Carousel
              value={novedades}
              itemTemplate={itemTemplate}
              numVisible={1}
              numScroll={1}
              responsiveOptions={responsiveOptions}
            ></Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicio;
