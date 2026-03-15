import { Injectable, signal, effect, computed } from '@angular/core';

interface ThemeConfig {
    name: 'standard' | 'sustainable';
    label: string;
    colors: {
        accent: string;
        paper: string;
        ink: string;
        line: string;
        success?: string;
        warning?: string;
        error?: string;
    };
    density: 'comfortable' | 'compact';
    reduceMotion: boolean;
}

const THEME_CONFIGS: Record<string, ThemeConfig> = {
    standard: {
        name: 'standard',
        label: 'ESTÁNDAR',
        colors: {
            // Paleta Opción A - Tema Estándar (Cálido)
            accent: '#B3679B',                          // Morado (Acción principal)
            paper: '#ede6d6',                           // Beige (Fondo PREDOMINANTE)
            ink: '#4e4b38',                             // Marrón oscuro (Texto)
            line: 'rgba(78, 75, 56, 0.08)',            // Rgba marrón (Líneas/Patrón)
            success: '#16a34a',                         // Verde éxito
            warning: '#f59e0b',                         // Ámbar advertencia
            error: '#ef4444'                            // Rojo error
        },
        density: 'comfortable',
        reduceMotion: false
    },
    sustainable: {
        name: 'sustainable',
        label: 'SOSTENIBLE',
        colors: {
            // Paleta Opción A - Tema Sostenible (Oscuro cálido)
            accent: '#B3679B',                          // Morado (Mantiene protagonismo)
            paper: '#1a1915',                           // Oscuro cálido (Fondo)
            ink: '#e8e3d8',                             // Beige claro (Texto)
            line: 'rgba(232, 227, 216, 0.08)',         // Rgba beige claro (Líneas/Patrón)
            success: '#16a34a',                         // Verde éxito
            warning: '#eab308',                         // Ámbar más brillante
            error: '#dc2626'                            // Rojo más brillante
        },
        density: 'compact',
        reduceMotion: true
    }
};

@Injectable({ providedIn: 'root' })
export class UI {

    private readonly currentTheme = signal<'standard' | 'sustainable'>(
        (localStorage.getItem('theme-mode') as 'standard' | 'sustainable') ?? 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'sustainable' : 'standard')
    );

    readonly themeConfig = computed((): ThemeConfig => {
        const theme = this.currentTheme();
        return THEME_CONFIGS[theme];
    });


    readonly isSustainable = computed((): boolean => this.currentTheme() === 'sustainable');

    /**
     * Signal para preferencia de movimiento reducido del sistema
     */
    private readonly prefersReducedMotion = signal<boolean>(
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    /**
     * Signal derivado: si debemos reducir movimiento (preferencia del sistema O tema sostenible)
     */
    readonly shouldReduceMotion = computed((): boolean => {
        return this.prefersReducedMotion() || this.isSustainable();
    });

    /**
     * Densidad actual del UI
     */
    readonly density = computed((): 'comfortable' | 'compact' => {
        return this.themeConfig().density;
    });

    /**
     * Acento dinámico (cambia según el tema)
     */
    readonly accentColor = computed((): string => {
        return this.themeConfig().colors.accent;
    });

    constructor() {
        this.initializeTheme();
        this.setupMediaQueryListener();
    }

    /**
     * Inicializa el tema en el DOM y aplica las variables CSS
     */
    private initializeTheme(): void {
        effect(() => {
            const theme = this.currentTheme();
            const config = this.themeConfig();

            // Actualizar clase en el body
            document.body.classList.remove('sustainable-mode', 'standard-mode');
            document.body.classList.add(`${theme}-mode`);

            // Aplicar variables CSS
            this.applyThemeVariables(config);

            // Guardar preferencia
            localStorage.setItem('theme-mode', theme);
            localStorage.setItem('theme-config', JSON.stringify(config));
        });
    }

    /**
     * Escucha cambios en la preferencia del sistema para movimiento reducido
     */
    private setupMediaQueryListener(): void {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (e: MediaQueryListEvent) => {
            this.prefersReducedMotion.set(e.matches);
        };

        // Para navegadores modernos
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Fallback para navegadores antiguos (deprecated pero necesario)
            (mediaQuery as any).addListener(handleChange);
        }
    }

    /**
     * Aplica las variables CSS del tema al documento
     * ⚠️ NO aplica background-image - ese es manejado por styles.css
     */
    private applyThemeVariables(config: ThemeConfig): void {
        const root = document.documentElement;
        const style = root.style;

        // Colores principales
        style.setProperty('--color-accent', config.colors.accent);
        style.setProperty('--color-paper', config.colors.paper);
        style.setProperty('--color-ink', config.colors.ink);
        style.setProperty('--color-line', config.colors.line);

        // Color secundario (marrón para estándar, marrón claro para sostenible)
        const accentSecondary = config.colors.ink === '#4e4b38' ? '#6e684a' : '#8b8470';
        style.setProperty('--color-accent-secondary', accentSecondary);

        // Colores de estado (si existen)
        if (config.colors.success) {
            style.setProperty('--color-success', config.colors.success);
        }
        if (config.colors.warning) {
            style.setProperty('--color-warning', config.colors.warning);
        }
        if (config.colors.error) {
            style.setProperty('--color-error', config.colors.error);
        }

        // Variables de transición (reducidas si es necesario)
        const transitionDuration = this.shouldReduceMotion() ? '0.1s' : '0.3s';
        style.setProperty('--transition-fast', `${transitionDuration}`);
        style.setProperty('--transition-normal', `${transitionDuration}`);

        // Meta tag de tema (para navegadores que lo soportan)
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', config.colors.accent);
        }

        // ⚠️ NO establecer background-image aquí - está en styles.css con background-attachment: fixed en html
    }

    /**
     * Alterna entre modo estándar y sostenible
     */
    toggleSustainableMode(): void {
    const newTheme = this.currentTheme() === 'standard' ? 'sustainable' : 'standard';
    this.currentTheme.set(newTheme);
    }
    /**
     * Establece un tema específico
     */
    setTheme(theme: 'standard' | 'sustainable'): void {
        this.currentTheme.set(theme);
    }

    /**
     * Obtiene la configuración actual del tema
     */
    getCurrentThemeConfig(): ThemeConfig {
    return this.themeConfig();
  }

    /**
     * Retorna todas las configuraciones disponibles
     */
    getAvailableThemes(): ThemeConfig[] {
    return Object.values(THEME_CONFIGS);
  }
}