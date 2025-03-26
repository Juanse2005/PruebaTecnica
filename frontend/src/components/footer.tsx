function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="https://www.linkedin.com/in/juan-sebastian-ni%C3%B1o-10a52b259/" className="hover:text-gray-400 text-sm" target="_blank">
                        Contacto
                    </a>
                    <a href="https://github.com/Juanse2005/PruebaTecnica.git" className="hover:text-gray-400 text-sm" target="_blank">
                        Repositorio github
                    </a>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
