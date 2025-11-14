import React from "react";

function MapExample() {
  const mapRef = React.useRef(null);

  // helper: load Google Maps script if not already present
  function loadGoogleMaps(apiKey) {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) return resolve(window.google);
      // check for existing script tag
      const existing = document.querySelector('script[data-googlemaps]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.google));
        existing.addEventListener('error', reject);
        return;
      }
      if (!apiKey) {
        reject(new Error('Google Maps API key not provided. Set VITE_GOOGLE_MAPS_API_KEY in .env or add the script tag to index.html.'));
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.setAttribute('data-googlemaps', 'true');
      script.onload = () => resolve(window.google);
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  React.useEffect(() => {
    let mounted = true;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    loadGoogleMaps(apiKey)
      .then((google) => {
        if (!mounted) return;
        const el = mapRef.current;
        if (!el) return;
        const lat = parseFloat("40.748817");
        const lng = parseFloat("-73.985428");
        const myLatlng = new google.maps.LatLng(lat, lng);
        const mapOptions = {
          zoom: 12,
          center: myLatlng,
          scrollwheel: false,
          zoomControl: true,
          styles: [
            { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
            { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f2f2f2' }] },
            { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
            { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] },
            { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
            { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
            { featureType: 'water', elementType: 'all', stylers: [{ color: '#4299e1' }, { visibility: 'on' }] },
          ],
        };

        const map = new google.maps.Map(el, mapOptions);

        const marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: 'Notus React!',
        });

        const contentString = '<div class="info-window-content"><h2>Notus React</h2>' +
          '<p>A free Admin for Tailwind CSS, React, and React Hooks.</p></div>';

        const infowindow = new google.maps.InfoWindow({ content: contentString });
        marker.addListener('click', () => infowindow.open(map, marker));
      })
      .catch((err) => {
        // developer-friendly message
        // eslint-disable-next-line no-console
        console.warn('Google Maps not loaded:', err.message || err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full" ref={mapRef} />
      </div>
    </>
  );
}

export default MapExample;
