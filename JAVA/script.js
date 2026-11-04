const $ = id => document.getElementById(id);
const leer = (clave, defecto) => { try { return JSON.parse(localStorage.getItem(clave)) || defecto; } catch (e) { return defecto; } };
const guardar = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));
const formatoPrecio = valor => '$' + valor.toLocaleString('es-CL');
const avisar = (el, texto, ok) => { el.textContent = texto; el.className = `mensaje-compra ${ok ? 'mensaje-exito' : 'mensaje-error'}`; };
const idProducto = new URLSearchParams(location.search).get('id');

document.querySelectorAll('.dropdown .dropbtn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const dropdown = btn.parentElement;
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== dropdown) d.classList.remove('activo-dropdown');
        });
        dropdown.classList.toggle('activo-dropdown');
    });
});

window.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => {
        d.classList.remove('activo-dropdown');
    });
});

const equipo = [
    { nombre: 'Vicente Leiva', rol: 'Desarrollador HTML, CSS y JavaScript', foto: 'IMG/yo.jpg', descripcion: 'Especializado en el dominio de código y diseño web.' },
    { nombre: 'Jose Cabello', rol: 'Jefe de ensamblaje', foto: 'IMG/marge.jpg', descripcion: 'Encargado de el ensamblaje, control de calidad y soporte técnico.' },
    { nombre: 'Cilin Jhonny', rol: 'Jefatura de ventas online.', foto: 'IMG/cartman.jpg', descripcion: 'Encargado de el marketing, atención al cliente y ventas online.' }
];

if ($('equipo')) {
    $('equipo').innerHTML = equipo.map(m => `
        <div class="tarjeta-miembro">
            <img src="${m.foto}" alt="${m.nombre}">
            <h3>${m.nombre}</h3>
            <h4>${m.rol}</h4>
            <p>${m.descripcion}</p>
        </div>`).join('');
}

const crearProducto = (id, nombre, precio, descripcion, specs, imagen = `IMG/${id}.webp`) => ({ id, nombre, precio, imagen, descripcion, specs });

const productos = [
    crearProducto('pc1', 'PC Gama Básica Ofimática Ryzen 5 5600G', 359990, 'Equipo ideal para ofimática, estudio y navegación diaria. Viene armado, testeado y listo para usar.',
        [['Gama', 'Básica'], ['Procesador', 'AMD Ryzen 5 5600G'], ['Memoria RAM', '16GB DDR4'], ['Almacenamiento', 'SSD NVMe 500GB'], ['Tarjeta de video', 'Gráficos integrados Radeon']]),
    crearProducto('pc2', 'PC Gama Básica Estudio Intel Core i3-12100', 329990, 'Equipo pensado para estudiantes: rápido para clases online, trabajos y multitarea liviana.',
        [['Gama', 'Básica'], ['Procesador', 'Intel Core i3-12100'], ['Memoria RAM', '16GB DDR4'], ['Almacenamiento', 'SSD SATA 512GB'], ['Tarjeta de video', 'Intel UHD Graphics 730']]),
    crearProducto('pc3', 'PC Gama Media Gaming Ryzen 5 7600 + RTX 4060', 649990, 'Equipo para jugar en 1080p con buena fluidez y también apto para programación.',
        [['Gama', 'Media'], ['Procesador', 'AMD Ryzen 5 7600'], ['Memoria RAM', '16GB DDR5'], ['Almacenamiento', 'SSD NVMe 1TB'], ['Tarjeta de video', 'NVIDIA GeForce RTX 4060 8GB']]),
    crearProducto('component1', 'Procesador AMD Ryzen 5 7600', 189990, 'Procesador de 6 núcleos y 12 hilos con arquitectura Zen 4, ideal para gaming y multitarea.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM5'], ['Núcleos / Hilos', '6 / 12'], ['Frecuencia máxima', '5.1 GHz']]),
    crearProducto('component2', 'Procesador Intel Core i5-13400F', 169990, 'Procesador de 10 núcleos con excelente rendimiento para gaming y programación. Requiere tarjeta de video dedicada.',
        [['Categoría', 'Procesadores'], ['Marca', 'Intel'], ['Socket', 'LGA1700'], ['Núcleos / Hilos', '10 / 16'], ['Frecuencia máxima', '4.6 GHz']]),
    crearProducto('component3', 'Tarjeta de Video NVIDIA GeForce RTX 4060 8GB', 329990, 'Tarjeta de video para jugar en 1080p con trazado de rayos y DLSS 3.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'NVIDIA'], ['Memoria', '8GB GDDR6'], ['Interfaz', 'PCIe 4.0 x8'], ['Consumo', '115 W']]),
    crearProducto('component4', 'Tarjeta de Video AMD Radeon RX 7600 8GB', 279990, 'Tarjeta de video de gran relación precio-rendimiento para jugar en 1080p.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'AMD'], ['Memoria', '8GB GDDR6'], ['Interfaz', 'PCIe 4.0 x8'], ['Consumo', '165 W']]),
    crearProducto('component5', 'Placa Madre ASUS Prime B650M-A AM5', 149990, 'Placa madre compatible con procesadores AMD Ryzen serie 7000 y memoria DDR5.',
        [['Categoría', 'Placas madre'], ['Marca', 'ASUS'], ['Socket', 'AM5'], ['Formato', 'Micro-ATX'], ['Memoria', 'DDR5']]),
    crearProducto('component6', 'Memoria RAM Kingston Fury Beast 16GB DDR5 5600MHz', 74990, 'Módulo de memoria DDR5 de alto rendimiento con compatibilidad Intel XMP 3.0.',
        [['Categoría', 'Memoria RAM'], ['Marca', 'Kingston'], ['Capacidad', '16GB'], ['Tipo', 'DDR5'], ['Frecuencia', '5600 MHz']]),
    crearProducto('component7', 'SSD NVMe Samsung 980 1TB', 69990, 'Unidad de estado sólido NVMe para cargas rápidas de sistema operativo, juegos y programas.',
        [['Categoría', 'Almacenamiento'], ['Marca', 'Samsung'], ['Capacidad', '1TB'], ['Interfaz', 'PCIe 3.0 NVMe'], ['Lectura secuencial', '3500 MB/s']]),
    crearProducto('component8', 'Fuente de Poder Corsair CX650 650W 80 Plus Bronze', 59990, 'Fuente de poder con certificación 80 Plus Bronze para equipos de gama media.',
        [['Categoría', 'Fuentes de poder'], ['Marca', 'Corsair'], ['Potencia', '650 W'], ['Certificación', '80 Plus Bronze'], ['Formato', 'ATX']]),
    crearProducto('component9', 'Gabinete Gamer Vidrio Templado ARGB', 64990, 'Gabinete con paneles de vidrio templado y ventiladores ARGB incluidos.',
        [['Categoría', 'Gabinetes'], ['Formato', 'Mid Tower ATX'], ['Panel lateral', 'Vidrio templado'], ['Ventiladores', 'ARGB'], ['Color', 'Negro']]),
    crearProducto('component10', 'Refrigeración Líquida 240mm ARGB', 69990, 'Refrigeración líquida AIO con radiador de 240mm y ventiladores ARGB.',
        [['Categoría', 'Refrigeración'], ['Tipo', 'Líquida AIO'], ['Radiador', '240mm'], ['Iluminación', 'ARGB'], ['Compatibilidad', 'Intel LGA1700 / AMD AM5']]),
    crearProducto('component11', 'Monitor Gamer LG 24" FHD 144Hz IPS', 87990, 'Monitor gamer con panel IPS, 144Hz y compatibilidad con NVIDIA G-SYNC y AMD FreeSync.',
        [['Categoría', 'Monitores'], ['Marca', 'LG'], ['Resolución', 'FHD (1920 x 1080)'], ['Frecuencia', '144Hz'], ['Panel', 'IPS']]),
    crearProducto('component12', 'Teclado Mecánico Gamer RGB', 34990, 'Teclado mecánico con switches rojos e iluminación RGB personalizable.',
        [['Categoría', 'Teclados y mouse'], ['Tipo', 'Mecánico'], ['Switch', 'Rojo'], ['Iluminación', 'RGB'], ['Conexión', 'USB']]),
    crearProducto('component13', 'Windows 11 Home Licencia Digital', 139990, 'Licencia digital de Windows 11 Home para instalar en tu equipo armado.',
        [['Categoría', 'Sistemas operativos'], ['Marca', 'Microsoft'], ['Versión', 'Windows 11 Home'], ['Licencia', 'Digital'], ['Arquitectura', '64 bits']], 'IMG/so.jpeg')
];

const buscar = id => productos.find(p => p.id === id);
const categoria = p => p.specs[0][0] === 'Categoría' ? p.specs[0][1] : 'PC armado';
const aleatorios = (cantidad, excluir) => productos.filter(p => p.id !== excluir).sort(() => Math.random() - 0.5).slice(0, cantidad);
const totalDe = items => items.reduce((suma, i) => suma + (buscar(i.id)?.precio || 0) * i.cantidad, 0);

const tarjetaProducto = p => `
    <a class="tarjeta-producto" href="producto.html?id=${p.id}">
        <img src="${p.imagen}" alt="${p.nombre}">
        <span class="etiqueta">${categoria(p)}</span>
        <h3>${p.nombre}</h3>
        <p class="tarjeta-precio">${formatoPrecio(p.precio)}</p>
    </a>`;

const obtenerCarrito = () => leer('carrito', []);
const guardarCarrito = carrito => guardar('carrito', carrito);
const quitarDelCarrito = id => guardarCarrito(obtenerCarrito().filter(i => i.id !== id));

function agregarAlCarrito(id) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id);
    if (item) item.cantidad++;
    else carrito.push({ id, cantidad: 1 });
    guardarCarrito(carrito);
}

function cambiarCantidad(id, cambio) {
    guardarCarrito(obtenerCarrito().map(i => i.id === id ? { ...i, cantidad: i.cantidad + cambio } : i).filter(i => i.cantidad > 0));
}

function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content, .tab-btn').forEach(el => el.classList.remove('active'));
    $(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function renderCarrito() {
    const contenedor = $('carrito-items');
    if (!contenedor) return;
    const lineas = obtenerCarrito().filter(i => buscar(i.id));

    $('carrito-cantidad').textContent = lineas.reduce((suma, i) => suma + i.cantidad, 0);
    $('carrito-total').textContent = formatoPrecio(totalDe(lineas));

    contenedor.innerHTML = lineas.length ? lineas.map(({ id, cantidad }) => {
        const p = buscar(id);
        return `
            <li class="carrito-item">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="carrito-item-info">
                    <h3>${p.nombre}</h3>
                    <p>${formatoPrecio(p.precio)} c/u</p>
                </div>
                <div class="carrito-cantidad">
                    <button data-id="${id}" data-accion="restar">-</button>
                    <span>${cantidad}</span>
                    <button data-id="${id}" data-accion="sumar">+</button>
                </div>
                <strong class="carrito-subtotal">${formatoPrecio(p.precio * cantidad)}</strong>
                <button class="carrito-quitar" data-id="${id}" data-accion="quitar">Quitar</button>
            </li>`;
    }).join('') : '<li class="carrito-vacio">Tu carrito está vacío. <a href="servicio.html">Ver productos</a></li>';
}

function renderCatalogo(texto = '') {
    const busqueda = texto.trim().toLowerCase();
    const filtrados = productos.filter(p => `${p.nombre} ${categoria(p)}`.toLowerCase().includes(busqueda));
    $('catalogo').innerHTML = filtrados.map(tarjetaProducto).join('') || '<p class="carrito-vacio">No se encontraron productos.</p>';
}

if ($('catalogo')) {
    renderCatalogo();
    $('buscador')?.addEventListener('input', e => renderCatalogo(e.target.value));
}

['destacados', 'relacionados'].forEach(id => {
    if ($(id)) $(id).innerHTML = aleatorios(4, idProducto).map(tarjetaProducto).join('');
});

if ($('producto')) {
    const p = buscar(idProducto);
    $('producto').innerHTML = p ? `
        <div class="ventana-venta">
            <div class="columna-imagen">
                <img src="${p.imagen}" alt="${p.nombre}" class="img-exhibicion">
            </div>
            <div class="columna-detalles">
                <div class="product-tabs">
                    <button class="tab-btn active" onclick="openTab(event, 'sobre-producto')">Sobre este producto</button>
                    <button class="tab-btn" onclick="openTab(event, 'especificaciones')">Especificaciones</button>
                    <button class="tab-btn" onclick="openTab(event, 'garantia')">Garantía</button>
                </div>
                <div id="sobre-producto" class="tab-content active">
                    <h2>Sobre el producto</h2>
                    <p>${p.descripcion}</p>
                </div>
                <div id="especificaciones" class="tab-content">
                    <h2>Especificaciones Generales</h2>
                    <table class="tabla-specs">
                        ${p.specs.map(([nombre, valor]) => `<tr><td><strong>${nombre}:</strong></td><td>${valor}</td></tr>`).join('')}
                    </table>
                </div>
                <div id="garantia" class="tab-content">
                    <h2>Información de Garantía</h2>
                    <p>Todo producto nuevo cuenta con una garantía legal de seis meses contados desde la fecha de compra en caso de falla de fábrica (Ley del consumidor 19.496). Además, los componentes cuentan con la garantía del fabricante.</p>
                </div>
            </div>
        </div>
        <div class="precio">
            <h1>${p.nombre}</h1>
            <h1>${formatoPrecio(p.precio)}</h1>
            <p>${categoria(p) === 'PC armado' ? 'Incluye ensamblaje y testeo' : 'Transferencia / Débito'}</p>
            <button id="btnEstatico">+ Agregar al carro</button>
            <p id="mensaje-agregado" class="mensaje-compra mensaje-exito"></p>
            <ul class="lista-beneficios">
                <li>Garantía legal de 6 meses y del fabricante</li>
                <li>Retiro en el taller o despacho por courier</li>
                <li>Si quieres, te lo armamos y probamos</li>
            </ul>
        </div>` : '<p>Producto no encontrado.</p>';

    $('btnEstatico')?.addEventListener('click', () => {
        agregarAlCarrito(p.id);
        $('mensaje-agregado').textContent = 'Producto añadido al carrito.';
    });
}

if ($('carrito-items')) {
    $('carrito-items').addEventListener('click', e => {
        const boton = e.target.closest('button[data-accion]');
        if (!boton) return;
        const { id, accion } = boton.dataset;
        if (accion === 'quitar') quitarDelCarrito(id);
        else cambiarCantidad(id, accion === 'sumar' ? 1 : -1);
        renderCarrito();
    });
    renderCarrito();
}

function guardarUsuario(usuario) {
    guardar('usuarioActivo', usuario);
    guardar('usuarios', leer('usuarios', []).map(u => u.correo === usuario.correo ? usuario : u));
}

function pedirSesion() {
    if ($('modal-sesion')) return;
    document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-sesion" class="modal-fondo">
            <div class="modal-caja" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
                <button type="button" class="modal-cerrar" id="modal-cerrar" aria-label="Cerrar">&times;</button>
                <div id="modal-contenido"></div>
            </div>
        </div>`);

    const modal = $('modal-sesion');
    const contenido = $('modal-contenido');

    function esc(e) { if (e.key === 'Escape') cerrar(); }
    function cerrar() {
        modal.remove();
        document.removeEventListener('keydown', esc);
    }
    document.addEventListener('keydown', esc);
    $('modal-cerrar').addEventListener('click', cerrar);
    modal.addEventListener('click', e => { if (e.target === modal) cerrar(); });

    const vistaInicial = () => {
        contenido.innerHTML = `
            <h2 id="modal-titulo">Necesitas una cuenta para comprar</h2>
            <p>Inicia sesión o crea tu cuenta para finalizar tu compra. Tu carrito se mantiene guardado.</p>
            <div class="modal-botones">
                <button type="button" class="btn btn-azul" id="modal-ir-login">Iniciar sesión</button>
                <button type="button" class="btn" id="modal-ir-registro">Crear cuenta</button>
            </div>`;
        $('modal-ir-login').addEventListener('click', () => vistaFormulario('login'));
        $('modal-ir-registro').addEventListener('click', () => vistaFormulario('registro'));
    };

    const sesionIniciada = usuario => {
        localStorage.removeItem('esAdmin');
        guardar('usuarioActivo', usuario);
        if ($('nav-cuenta')) $('nav-cuenta').textContent = 'Mi cuenta';
        cerrar();
        if ($('mensaje-compra')) avisar($('mensaje-compra'), 'Sesión iniciada. Ya puedes presionar Comprar para finalizar tu pedido.', true);
    };

    const vistaFormulario = modo => {
        const esLogin = modo === 'login';
        contenido.innerHTML = `
            <h2 id="modal-titulo">${esLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
            <form id="modal-form" class="modal-form">
                <label for="modal-correo">Correo electrónico:</label>
                <input type="email" id="modal-correo" required>

                <label for="modal-password">Contraseña:</label>
                <input type="password" id="modal-password" required>

                <button type="submit" class="btn btn-azul">${esLogin ? 'Ingresar' : 'Registrarme'}</button>
                <p id="modal-mensaje" class="mensaje-compra"></p>
            </form>
            <div class="modal-enlaces">
                <button type="button" class="modal-enlace" id="modal-volver">← Volver</button>
                <button type="button" class="modal-enlace" id="modal-cambiar">${esLogin ? '¿No tienes cuenta? Crear cuenta' : '¿Ya tienes cuenta? Iniciar sesión'}</button>
            </div>`;

        $('modal-correo').focus();
        $('modal-volver').addEventListener('click', vistaInicial);
        $('modal-cambiar').addEventListener('click', () => vistaFormulario(esLogin ? 'registro' : 'login'));

        $('modal-form').addEventListener('submit', e => {
            e.preventDefault();
            const correo = $('modal-correo').value.trim().toLowerCase();
            const password = $('modal-password').value;
            const aviso = $('modal-mensaje');
            const lista = leer('usuarios', []);

            if (esLogin) {
                const encontrado = lista.find(u => u.correo === correo && u.password === password);
                if (!encontrado || correo === 'admin') return avisar(aviso, 'Correo o contraseña incorrectos.', false);
                return sesionIniciada(encontrado);
            }

            if (lista.some(u => u.correo === correo)) return avisar(aviso, 'El correo electrónico ya está registrado.', false);
            const nuevo = { correo, password, nombre: '', apellido: '', fotoPerfil: '', compras: [] };
            guardar('usuarios', [...lista, nuevo]);
            sesionIniciada(nuevo);
        });
    };

    vistaInicial();
}

$('btnComprar')?.addEventListener('click', () => {
    const aviso = $('mensaje-compra');
    const carrito = obtenerCarrito();
    if (!carrito.length) return avisar(aviso, 'Tu carrito está vacío. Agrega productos para poder comprar.', false);

    const sesion = leer('usuarioActivo', null);
    if (!sesion) return pedirSesion();

    const usuario = leer('usuarios', []).find(u => u.correo === sesion.correo) || sesion;
    const fecha = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    guardarUsuario({ ...usuario, compras: [...(usuario.compras || []), { fecha, total: totalDe(carrito), items: carrito }] });

    guardarCarrito([]);
    renderCarrito();
    avisar(aviso, '¡Gracias por tu compra! Tu pedido fue registrado y guardado en tu historial.', true);
});

const reglasFiltro = {
    cpu: ['procesador', 'ryzen', 'intel'],
    gpu: ['tarjeta de video', 'rtx', 'gtx', 'radeon'],
    ram: ['memoria ram'],
    almacenamiento: ['ssd', 'disco duro'],
    fuente: ['fuente de poder'],
    refrigeracion: ['refrigeración', 'cooler'],
    so: ['licencia']
};

function ejecutarFiltroDeComponentes() {
    const contenedor = $('resultados-compatibles');
    if (!contenedor) return;
    const seleccionadas = [...document.querySelectorAll('input[name="componente"]:checked')].map(cb => cb.value);

    if (!seleccionadas.length) {
        contenedor.innerHTML = '<p><em>Por favor, selecciona al menos una categoría de componente.</em></p>';
        return;
    }

    const componentes = productos
        .filter(p => p.id.startsWith('component') && seleccionadas.some(cat =>
            reglasFiltro[cat]?.some(t => p.nombre.toLowerCase().includes(t)) || categoria(p).toLowerCase().includes(cat)))
        .sort((a, b) => a.precio - b.precio);

    const fila = (p, clase, enlace) => `
        <div class="card-producto-filtro ${clase}">
            <div class="filtro-info">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div>
                    <h4>${p.nombre}</h4>
                    <p>${p.descripcion}</p>
                </div>
            </div>
            <div class="filtro-precio">
                <span>${formatoPrecio(p.precio)}</span>
                <a href="producto.html?id=${p.id}">${enlace}</a>
            </div>
        </div>`;

    contenedor.innerHTML = `
        <h3 class="filtro-titulo">Componentes individuales encontrados (Ordenados por menor precio):</h3>
        ${componentes.length ? `<div class="lista-filtrada-grid">${componentes.map(p => fila(p, '', 'Ver detalle')).join('')}</div>` : '<p><em>No hay componentes sueltos para esta selección específica.</em></p>'}
        <h3 class="filtro-titulo filtro-pcs">¿Prefieres ahorrar tiempo? Te sugerimos estas PCs ya armadas y listas para usar:</h3>
        <div class="lista-filtrada-grid">${productos.filter(p => p.id.startsWith('pc')).map(p => fila(p, 'pc-armada', 'Ver PC Armada')).join('')}</div>`;
}

function renderHistorialCompras(compras) {
    const lista = $('historial-compras');
    if (!lista) return;
    lista.innerHTML = compras?.length ? compras.map((c, i) => `
        <li class="compra-historial">
            <div class="compra-cabecera">
                <strong>Compra #${i + 1} - Fecha: ${c.fecha}</strong>
                <span>Total: ${formatoPrecio(c.total || 0)}</span>
            </div>
            <ul style="list-style: none; padding: 0; margin-top: 10px;">
                ${c.items.map(item => {
                    const p = buscar(item.id);
                    return `<li style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <img src="${p ? p.imagen : ''}" alt="${p ? p.nombre : 'Producto'}" style="width: 40px; height: 40px; object-fit: contain; background: #fff; border: 1px solid var(--borde); border-radius: 4px;">
                        <span>${p ? p.nombre : 'Producto'} - Cantidad: ${item.cantidad} (${formatoPrecio((p ? p.precio : 0) * item.cantidad)})</span>
                    </li>`;
                }).join('')}
            </ul>
        </li>`).join('') : '<li>No tienes compras registradas todavía.</li>';
}

function renderPanelAdmin() {
    const contenedor = $('contenedor-usuarios-admin');
    if (!contenedor) return;
    const clientes = leer('usuarios', []).filter(u => u.correo !== 'admin' && u.correo !== 'administrador');

    contenedor.innerHTML = clientes.length ? clientes.map(u => `
        <div class="tarjeta-admin">
            <div class="admin-cabecera">
                ${u.fotoPerfil ? `<img src="${u.fotoPerfil}" alt="Foto de perfil">` : '<div class="admin-sin-foto">Sin foto</div>'}
                <div>
                    <h4>${u.correo}</h4>
                    <p><strong>Nombre:</strong> ${u.nombre || 'No registrado'} ${u.apellido || ''}</p>
                </div>
            </div>
            <h5>Historial de productos comprados:</h5>
            ${u.compras?.length ? `<ul>${u.compras.map(c => `
                <li>
                    <strong>Fecha: ${c.fecha}</strong> - Total: ${formatoPrecio(c.total || 0)}
                    <ul style="list-style: none; padding: 0; margin-top: 5px;">${c.items.map(i => {
                        const p = buscar(i.id);
                        return `<li style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                            <img src="${p ? p.imagen : ''}" alt="${p ? p.nombre : 'Producto'}" style="width: 35px; height: 35px; object-fit: contain; background: #fff; border: 1px solid var(--borde); border-radius: 4px;">
                            <span>${p ? p.nombre : 'Producto'} (Cant: ${i.cantidad})</span>
                        </li>`;
                    }).join('')}</ul>
                </li>`).join('')}</ul>` : '<p class="admin-vacio">Este usuario aún no ha realizado compras.</p>'}
        </div>`).join('') : '<p>No hay cuentas de usuarios clientes registradas.</p>';
}

const pagina = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('header a:not(:first-child)').forEach(a => {
    if (a.getAttribute('href') === (pagina === 'producto.html' ? 'servicio.html' : pagina)) a.classList.add('activo');
});

const paginaActual = location.pathname.split('/').pop() || 'index.html';

if (paginaActual !== 'registro.html') {
    document.querySelector('footer')?.insertAdjacentHTML('beforebegin', (a => `
        <section class="publicidad">
            <div class="publicidad-imagen"><img src="${a.imagen}" alt="${a.nombre}"></div>
            <div class="publicidad-texto">
                <span class="etiqueta">Te recomendamos</span>
                <h2>${a.nombre}</h2>
                <p>${a.descripcion}</p>
                <strong>${formatoPrecio(a.precio)}</strong>
                <a class="boton" href="producto.html?id=${a.id}">Ver producto</a>
            </div>
        </section>`)(aleatorios(1, idProducto)[0]));
}

document.addEventListener('DOMContentLoaded', () => {
    const usuarios = leer('usuarios', []);
    if (!usuarios.some(u => u.correo === 'admin')) {
        guardar('usuarios', [...usuarios, { correo: 'admin', password: '123', nombre: 'Admin', apellido: 'General', compras: [] }]);
    }

    $('btnFiltrar')?.addEventListener('click', ejecutarFiltroDeComponentes);

    const usuarioActivo = leer('usuarioActivo', null);
    const esAdmin = localStorage.getItem('esAdmin') === 'true';
    const formRegistro = $('form-registro');
    const contenedorForms = formRegistro?.closest('main');
    const inputNombre = $('user-nombre');
    const inputApellido = $('user-apellido');
    const btnEditar = $('btn-habilitar-edicion');
    const ver = (el, visible, tipo = 'block') => { if (el) el.style.display = visible ? tipo : 'none'; };

    const mostrarFoto = src => {
        if (src) $('preview-foto').src = src;
        ver($('preview-foto'), !!src);
        ver($('sin-foto'), !src, 'flex');
    };

    const modoEdicion = editando => {
        inputNombre.disabled = inputApellido.disabled = !editando;
        ver($('btn-guardar-datos'), editando, 'inline-block');
        btnEditar.textContent = editando ? 'Cancelar' : 'Modificar Datos';
        btnEditar.classList.toggle('btn-naranja', editando);
        btnEditar.classList.toggle('btn-azul', !editando);
    };

    if ($('nav-cuenta')) {
        $('nav-cuenta').textContent = esAdmin ? 'Panel Admin' : usuarioActivo ? 'Mi cuenta' : 'Inicio de sesión';
    }

    if (esAdmin) {
        ver(contenedorForms, false);
        ver($('panel-usuario'), false);
        if ($('panel-admin')) {
            ver($('panel-admin'), true);
            renderPanelAdmin();
        }
    } else if (usuarioActivo && $('panel-usuario')) {
        ver(contenedorForms, false);
        ver($('panel-usuario'), true);
        $('span-correo').textContent = usuarioActivo.correo;
        inputNombre.value = usuarioActivo.nombre || '';
        inputApellido.value = usuarioActivo.apellido || '';
        mostrarFoto(usuarioActivo.fotoPerfil);
        renderHistorialCompras(usuarioActivo.compras);
    }

    btnEditar?.addEventListener('click', () => {
        const editar = inputNombre.disabled;
        modoEdicion(editar);
        if (!editar && usuarioActivo) {
            inputNombre.value = usuarioActivo.nombre || '';
            inputApellido.value = usuarioActivo.apellido || '';
        }
    });

    if (usuarioActivo) {
        $('input-foto')?.addEventListener('change', e => {
            const archivo = e.target.files[0];
            if (!archivo) return;
            const lector = new FileReader();
            lector.onload = ev => {
                usuarioActivo.fotoPerfil = ev.target.result;
                guardarUsuario(usuarioActivo);
                mostrarFoto(usuarioActivo.fotoPerfil);
            };
            lector.readAsDataURL(archivo);
        });

        $('form-datos-personales')?.addEventListener('submit', e => {
            e.preventDefault();
            const aviso = $('mensaje-datos');
            const [nombre, apellido] = [inputNombre, inputApellido].map(i => i.value.trim());
            if (!nombre || !apellido) return avisar(aviso, 'Por favor completa ambos campos.', false);

            const capitalizar = t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
            usuarioActivo.nombre = inputNombre.value = capitalizar(nombre);
            usuarioActivo.apellido = inputApellido.value = capitalizar(apellido);
            guardarUsuario(usuarioActivo);
            modoEdicion(false);
            avisar(aviso, '¡Datos personales actualizados correctamente!', true);
        });
    }

    formRegistro?.addEventListener('submit', e => {
        e.preventDefault();
        const correo = $('reg-correo').value.trim().toLowerCase();
        const aviso = $('mensaje-registro');
        const lista = leer('usuarios', []);
        if (lista.some(u => u.correo === correo)) return avisar(aviso, 'El correo electrónico ya está registrado.', false);

        guardar('usuarios', [...lista, { correo, password: $('reg-password').value, nombre: '', apellido: '', fotoPerfil: '', compras: [] }]);
        avisar(aviso, '¡Registro exitoso! Ya puedes iniciar sesión.', true);
        formRegistro.reset();
    });

    $('form-login')?.addEventListener('submit', e => {
        e.preventDefault();
        const correo = $('login-correo').value.trim().toLowerCase();
        const password = $('login-password').value;
        const encontrado = leer('usuarios', []).find(u => u.correo === correo && u.password === password);
        if (!encontrado || correo === 'admin') return avisar($('mensaje-login'), 'Correo o contraseña incorrectos.', false);

        localStorage.removeItem('esAdmin');
        guardar('usuarioActivo', encontrado);
        location.reload();
    });

    $('form-login-admin')?.addEventListener('submit', e => {
        e.preventDefault();
        if ($('admin-correo').value.trim().toLowerCase() === 'admin' && $('admin-password').value === '123') {
            localStorage.setItem('esAdmin', 'true');
            localStorage.removeItem('usuarioActivo');
            return location.reload();
        }
        avisar($('mensaje-login-admin'), 'Credenciales de administrador incorrectas.', false);
    });

    $('CerrarSesion')?.addEventListener('click', () => { localStorage.removeItem('usuarioActivo'); location.reload(); });
    $('CerrarSesionAdmin')?.addEventListener('click', () => { localStorage.removeItem('esAdmin'); location.reload(); });
});