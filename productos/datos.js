// 🔥 Loader desde API (MySQL)
(function(){

  function setProductos(data){
    // validar que sea array
    var list = Array.isArray(data) ? data : [];

    // convertir galeria (string → array)
    list = list.map(p => {
      let galeria = [];

      try {
        galeria = p.galeria ? JSON.parse(p.galeria) : [];
      } catch(e) {
        galeria = [];
      }

      return {
        ...p,
        galeria: galeria
      };
    });

    // guardar global
    window.productos = list;

    // avisar a tu sistema (esto ya lo usas en tu HTML)
    try{
      window.dispatchEvent(new CustomEvent('productosLoaded'));
    }catch(e){}
  }

  // 🔹 fetch desde tu backend
  if (typeof fetch === 'function'){
    fetch("http://localhost:3000/productos", { cache: 'no-store' })
      .then(function(response){
        if (!response.ok) throw new Error("Error en la API");
        return response.json();
      })
      .then(setProductos)
      .catch(function(error){
        console.error("❌ Error cargando productos:", error);
        setProductos([]);
      });
  }

})();