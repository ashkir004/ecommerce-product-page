import { on } from 'svelte/events';

export function trapFocus(node: HTMLElement, nextFocusSelector: string = '.main') {
	const next = document.activeElement?.querySelector<HTMLElement>(nextFocusSelector);

	function focusable(): HTMLElement[] {
		return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
	}

	function handleKeydown(event: KeyboardEvent) {

		if (event.key === 'Escape') {
			next?.focus();
			event.preventDefault();
			return;
		}

		if (event.key !== 'Tab') return;

		const current = document.activeElement;

		const elements: HTMLElement[] = focusable();
		const first: HTMLElement | undefined = elements.at(0);
		const last: HTMLElement | undefined = elements.at(-1);

		if (event.shiftKey && current === first) {
			last?.focus();
			event.preventDefault();
		}

		if (!event.shiftKey && current === last) {
			first?.focus();
			event.preventDefault();
		}
	}

	focusable()[2]?.focus();
	const off = on(node, 'keydown', handleKeydown);

	return () => {
		off();
		next?.focus();
	}
}
