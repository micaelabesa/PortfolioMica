// src/app/services/ui.ts
import { Injectable, signal, effect, computed } from '@angular/core';

/**
 * Interfaz para la configuración de tema
 */
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

/**
 * Configuración de temas disponibles
 */
const THEME_CONFIGS: Record<string, ThemeConfig> = {
    standard: {
        name: 'standard',
        label: 'ESTÁNDAR',
        colors: {
            accent: '#2d5a27',      // Tech Green
            paper: '#ffffff',
            ink: '#000000',
            line: '#e0e0e0',
            success: '#2d5a27',
            warning: '#f59e0b',
            error: '#ef4444'
        },
        density: 'comfortable',
        reduceMotion: false
    },
    sustainable: {
        name: 'sustainable',
        label: 'SOSTENIBLE',
        colors: {
            accent: '#16a34a',      // Green más brillante (eco-friendly)
            paper: '#fafaf8',       // Ligeramente teñido
            ink: '#1f2937',         // Más suave
            line: '#ddd6d0',        // Línea más cálida
            success: '#16a34a',
            warning: '#eab308',
            error: '#dc2626'
        },
        density: 'compact',
        reduceMotion: true
    }
};

@Injectable({ providedIn: 'root' })
export class UI {
    /**
     * Signal para el tema actual
     */
    private readonly currentTheme = signal<'standard' | 'sustainable'>(
        (localStorage.getItem('theme-mode') as 'standard' | 'sustainable') ?? 'standard'
    );

    /**
     * Signal para la configuración del tema (derivado)
     */
    readonly themeConfig = computed((): ThemeConfig => {
        const theme = this.currentTheme();
        return THEME_CONFIGS[theme];
    });

    /**
     * Signal público para compatibilidad hacia atrás
     */
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
            // Fallback para navegadores antiguos
            mediaQuery.addListener(handleChange);
        }
    }

    /**
     * Aplica las variables CSS del tema al documento
     */
    private applyThemeVariables(config: ThemeConfig): void {
        const root = document.documentElement;
        const style = root.style;

        // Colores principales
        style.setProperty('--color-accent', config.colors.accent);
        style.setProperty('--color-paper', config.colors.paper);
        style.setProperty('--color-ink', config.colors.ink);
        style.setProperty('--color-line', config.colors.line);
        style.setProperty('--tech-green', config.colors.accent);

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
    }

    /**
     * Alterna entre modo estándar y sostenible
     */
    toggleSustainableMode(): boolean {
        const newTheme = this.currentTheme() === 'standard' ? 'sustainable' : 'standard';
        this.currentTheme.set(newTheme);
        return this.isSustainable();
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