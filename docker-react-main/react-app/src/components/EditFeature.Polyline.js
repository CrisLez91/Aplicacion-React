import React, { useState, useEffect } from "react";
import L from "leaflet";
import {
	Map,
	TileLayer,
	Marker,
	Popup,
	FeatureGroup,
	Circle
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";



const EditFeaturePolyline = ({ register, unregister, nombreID, errorMapa, setErrorMapa }) => {

	const [selecctor, setSelecctor] = useState(true);
	var mapacor = [];
	console.log(errorMapa);


	const eliminarError = (clave) => {
		// Crea una copia del objeto de errores
		const nuevoErrorMapa = { ...errorMapa };
		// Elimina la clave del objeto
		delete nuevoErrorMapa[clave];
		// Actualiza el estado con el nuevo objeto sin la clave
		setErrorMapa(nuevoErrorMapa);
	};

	useEffect(() => {
		if (!selecctor)
			eliminarError(nombreID)
	}, [selecctor]);

	const _onEdited = e => {
		let layer = e.layer;
		let numEdited = 0;
		e.layers.eachLayer(layer => {
			numEdited += 1;
		});
		let aux = e.layers.toGeoJSON().features[0].geometry.coordinates;
		console.log("Geojson", aux);
		console.log(`_onEdited: edited ${numEdited} layers`, e);
		unregister(nombreID)
		register(nombreID, { value: "[" + aux[1].toString() + "," + aux[0].toString() + "]" })
		// this._onChange();
	};



	const _onCreated = e => {
		console.log(errorMapa);
		let type = e.layerType;
		let layer = e.layer;
		if (type === "marker") {
			console.log("_onCreated: marker created", e);
		} else {
			console.log("_onCreated: something else created:", type, e);
		}
		var aux = layer.getLatLngs();
		console.log(aux.length)
		console.log(aux[0].lat)



		var impa = "["

		for (let index = 0; index < aux.length; index++) {
			impa = impa + "[" + aux[index].lat.toString() + "," + aux[index].lng.toString() + "]"
			if (index + 1 < aux.length) {
				impa = impa + ","
			}
		}
		console.log(impa + "]")
		mapacor.push(impa + "]")
		console.log(mapacor)

		var auxF = "["
		for (let index = 0; index < mapacor.length; index++) {
			auxF = auxF + mapacor[index]
			if (index + 1 < mapacor.length) {
				auxF = auxF + ","
			}
		}
		unregister(nombreID)
		register(nombreID, { value: auxF + "]" })
		setSelecctor(false)
		//errosres
		console.log("coords", layer.getLatLngs());
		// Do whatever else you need to. (save to db; etc)

		// this._onChange();
	};

	const _onDeleted = e => {
		let numDeleted = 0;
		e.layers.eachLayer(layer => {
			numDeleted += 1;
		});
		setSelecctor(true)
		console.log(`onDeleted: removed ${numDeleted} layers`, e);
		unregister(nombreID)
		// this._onChange();
	};

	const _onMounted = e => {
		console.log("_onMounted", e);

	};


	const _onEditStart = e => {
		console.log("_onEditStart", e);
	};

	const _onEditStop = e => {
		console.log("_onEditStop", e);
	};

	const _onDeleteStart = e => {
		console.log("_onDeleteStart", e);
	};

	const _onDeleteStop = e => {
		console.log("_onDeleteStop", e);
	};

	const _onDrawStart = e => {
		console.log("_onDrawStart", e);
		console.log(errorMapa);

	};



	/*
onEdited	function	hook to leaflet-draw's draw:edited event
onCreated	function	hook to leaflet-draw's draw:created event
onDeleted	function	hook to leaflet-draw's draw:deleted event
onMounted	function	hook to leaflet-draw's draw:mounted event
onEditStart	function	hook to leaflet-draw's draw:editstart event
onEditStop	function	hook to leaflet-draw's draw:editstop event
onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
onDrawStart	function	hook to leaflet-draw's draw:drawstart event
onDrawStop	function	hook to leaflet-draw's draw:drawstop event
onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
onEditMove	function	hook to leaflet-draw's draw:editmove event
onEditResize	function	hook to leaflet-draw's draw:editresize event
onEditVertex	function	hook to leaflet-draw's draw:editvertex event*/
	return (
		<FeatureGroup>
			<EditControl
				onDrawStart={_onDrawStart}
				position="topright"
				onEdited={_onEdited}
				onCreated={_onCreated}
				onDeleted={_onDeleted}
				edit={
					{
						remove: false,
						edit: false
					}
				}
				draw={{
					polyline: {
						icon: new L.DivIcon({
							iconSize: new L.Point(8, 8),
							className: "leaflet-div-icon leaflet-editing-icon"
						}),
						shapeOptions: {
							guidelineDistance: 10,
							color: "navy",
							weight: 3
						}

					},
					marker: {
						repeatMode: false
					},
					rectangle: false,
					circlemarker: false,
					circle: false,
					polygon: false,
					polyline: true,
					marker: false
				}}
			/>
		</FeatureGroup>
	);
};

export default EditFeaturePolyline;
