const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component';

// Paste this code after return WithSubscription
// WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;

export { getDisplayName };