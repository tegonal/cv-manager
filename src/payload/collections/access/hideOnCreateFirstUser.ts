export const hideOnCreateFirstUser = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    return path !== '/admin/create-first-user';
  }
};
