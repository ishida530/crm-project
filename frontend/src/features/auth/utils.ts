export const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('sidebar');
    console.log('Logout succesfull')
}
