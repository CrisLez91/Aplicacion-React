import Abierta from "./componente-abierta.component";
import Checkboxe from "./componente-checkbox.component";
import Comboboxe from "./componente-combobox.component";
import Radiobutton from "./componente-radioButon.component";
import RadiobuttonV2 from "./componente-radioButonV2.component";
import Mapa from "./componente-mapa.component";
import Imagen from "./componente-imagen.component";
import Errores from "./componente-errores";
import ErroresMapas from "./componente-errores.mapas";
import Calendario from "./componente-calendario.component"
import Reloj from "./componente-reloj.component";

export default function ComponentsGatai({ data, errors, register, unregister, errorMapa, setErrorMapa }) {
  const a = ["abierta", "Checkbox", "ComboBox", "Radiobutton", "imagen", "MultiLinestring"]
  const spCalendario = ["65fb41ecc60fcb54b3da18bd", "65fb41f6c60fcb54b3da18be"]
  const spReloj = ["65fb42b9c60fcb54b3da18c1" , "65fb42c1c60fcb54b3da18c2"]


  for (let i = 0; i < spCalendario.length; i++) {
    if (data.id === spCalendario[i])
      return (
        <div>
          <Calendario register={register} enunciadoPregunta={data.enunciadoPregunta} nombreID={data.id} unregister={unregister} errorMapa={errorMapa} setErrorMapa={setErrorMapa} />
          <ErroresMapas nombreID={data.id} errorMapa={errorMapa} />
        </div>
      );
  }

  for (let i = 0; i < spReloj.length; i++) {
    if (data.id === spReloj[i])
      return (
        <div>
          <Reloj register={register} enunciadoPregunta={data.enunciadoPregunta} nombreID={data.id} unregister={unregister} errorMapa={errorMapa} setErrorMapa={setErrorMapa} />
          <ErroresMapas nombreID={data.id} errorMapa={errorMapa} />
        </div>
      );
  }


  if (data.tipoPregunta === a[0])
    return (
      <div>
        <Abierta register={register} enunciadoPregunta={data.enunciadoPregunta} nombreID={data.id}  errorMapa={errorMapa} setErrorMapa={setErrorMapa} />
        <ErroresMapas nombreID={data.id} errorMapa={errorMapa} />
      </div>
    );
  if (data.subTipoPregunta === a[1])
    return (
      <div>
        <Checkboxe opciones={data.opciones} enunciadoPregunta={data.enunciadoPregunta} register={register} nombreID={data.id} />
      </div>
    );
  if (data.subTipoPregunta === a[2])
    return (
      <div>
        <Comboboxe opciones={data.opciones} enunciadoPregunta={data.enunciadoPregunta} register={register} nombreID={data.id}  errorMapa={errorMapa} setErrorMapa={setErrorMapa} />
        <ErroresMapas nombreID={data.id} errorMapa={errorMapa} />
      </div>
    );
  if (data.subTipoPregunta === a[3])
    return (
      <div>
        <RadiobuttonV2 opciones={data.opciones} enunciadoPregunta={data.enunciadoPregunta} register={register} nombreID={data.id} errorMapa={errorMapa} setErrorMapa={setErrorMapa}/>
        <ErroresMapas nombreID={data.id} errorMapa={errorMapa} />
      </div>
    );
  if (data.tipoPregunta === a[4])
    return (
      <div>
        <Imagen nombreID={data.id} register={register} unregister={unregister} enunciadoPregunta={data.enunciadoPregunta} setErrorMapa={setErrorMapa} errorMapa={errorMapa} />
        <ErroresMapas nombreID={data.id} errorMapa={errorMapa} />
      </div>
    );
  if (data.subTipoMapa === a[5])
    return (
      <div>
        <Mapa nombreID={data.id} register={register} enunciadoPregunta={data.enunciadoPregunta} unregister={unregister} errorMapa={errorMapa} setErrorMapa={setErrorMapa} />
        <ErroresMapas nombreID={data.id} errorMapa={errorMapa} />
      </div>
    );

}