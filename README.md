# Form React Humano Test

## 📋 Descripción Funcional

Esta es una aplicación web de registro de usuarios desarrollada con **Next.js 15** y **React 19**. La aplicación permite a los usuarios registrarse proporcionando información básica como nombre, email y contraseña, con soporte completo para internacionalización (español e inglés) y modo oscuro.

### ¿Qué hace la aplicación?

1. **Registro de Usuarios**: Los usuarios pueden crear una cuenta proporcionando nombre, email y contraseña
2. **Autenticación**: Sistema de login/logout con persistencia en localStorage
3. **Internacionalización**: Soporte completo para español e inglés
4. **Modo Oscuro**: Tema claro y oscuro con transiciones suaves
5. **Visualización de Datos**: Los usuarios autenticados pueden ver sus datos en formato JSON
6. **Notificaciones**: Sistema de toasts para feedback al usuario
7. **Responsive Design**: Interfaz completamente responsive para móviles y desktop

### ¿Cómo funciona?

1. **Página Principal**: Muestra un banner de bienvenida y opción de registro para usuarios no autenticados
2. **Registro**: Formulario con validación en tiempo real usando Zod
3. **Autenticación**: Después del registro, el usuario es automáticamente autenticado
4. **Dashboard**: Los usuarios autenticados pueden ver sus datos y información de cuenta
5. **Persistencia**: Los datos se almacenan en localStorage para mantener la sesión

---

## 🛠️ Detalle Técnico

### Arquitectura y Stack Tecnológico

#### Framework Principal
- **Next.js 15.3.5**: Elegido por su excelente soporte para SSR, App Router, y optimizaciones automáticas
- **React 19**: La última versión con mejoras en performance y nuevas características

#### Gestión de Estado
- **React Context API**: Para manejo de estado global (autenticación, idioma, loading, toasts)
  - `AuthContext`: Manejo de autenticación y datos del usuario
  - `LanguageContext`: Internacionalización y cambio de idioma
  - `LoadingContext`: Estados de carga globales
  - `ToastContext`: Sistema de notificaciones

#### Validación de Formularios
- **React Hook Form 7.60.0**: Elegido por su excelente performance y mínimos re-renders
- **Zod 4.0.5**: Schema validation con TypeScript-first approach
- **@hookform/resolvers 5.1.1**: Integración entre React Hook Form y Zod

#### Estilos y UI
- **Tailwind CSS 4**: Framework utility-first para styling rápido y consistente
- **Responsive Design**: Mobile-first approach con breakpoints responsivos

#### Notificaciones
- **React Hot Toast 2.5.2**: Librería ligera y customizable para toasts/notificaciones

#### Desarrollo y Calidad de Código


### Decisiones Técnicas y Justificaciones

#### 1. Next.js 15 con App Router
**¿Por qué?**
- Mejor performance con Server Components por defecto
- Routing file-based más intuitivo
- Optimizaciones automáticas (Code Splitting, Image Optimization)
- Excelente soporte para TypeScript

#### 2. React Hook Form + Zod
**¿Por qué?**
- **Performance**: Mínimos re-renders durante la escritura
- **Type Safety**: Zod proporciona validación con tipos TypeScript automáticos
- **Developer Experience**: API declarativa y fácil de usar
- **Bundle Size**: Librerías ligeras comparadas con alternativas

#### 3. Context API vs Redux
**¿Por qué Context API?**
- **Simplicidad**: Para el scope del proyecto, Context API es suficiente
- **No Over-engineering**: Redux sería excesivo para esta aplicación
- **Performance**: Con una arquitectura bien pensada, Context API es eficiente
- **Bundle Size**: Sin dependencias adicionales

#### 4. Tailwind CSS
**¿Por qué?**
- **Productividad**: Desarrollo rápido con utility classes
- **Consistencia**: Design system integrado
- **Performance**: Tree-shaking automático de CSS no usado
- **Dark Mode**: Soporte nativo para temas

#### 5. localStorage para Persistencia
**¿Por qué?**
- **Simplicidad**: Para un prototipo, localStorage es adecuado
- **No Backend**: Permite funcionalidad completa sin servidor
- **Persistencia**: Mantiene la sesión entre recargas de página

#### 6. TypeScript
**¿Por qué?**
- **Type Safety**: Prevención de errores en tiempo de compilación
- **IntelliSense**: Mejor experiencia de desarrollo
- **Refactoring**: Cambios seguros en el código
- **Documentación**: Los tipos sirven como documentación viva

### Funcionalidades Implementadas

#### 🔐 Sistema de Autenticación
#### 🌐 Internacionalización (i18n)
#### 🎨 Interfaz de Usuario
#### ✅ Validación de Formularios
#### 📱 Experiencia de Usuario



## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- Yarn o npm

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
yarn install

# Iniciar en modo desarrollo
yarn dev
```

### Despliegue
La aplicación está optimizada para desplegarse en **Vercel** con configuración automática.

```bash
# Build para producción
yarn build

# Desplegar en Vercel
npx vercel --prod
```


