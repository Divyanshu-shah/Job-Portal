import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
    const { isDark } = useTheme();
    const blendMode = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className={`absolute -top-20 left-[-15%] w-[600px] h-[600px] rounded-full ${blendMode} filter blur-[120px] opacity-25 animate-blob ${isDark ? 'bg-emerald-600' : 'bg-emerald-200'}`}></div>
            <div className={`absolute -top-10 right-[-15%] w-[550px] h-[550px] rounded-full ${blendMode} filter blur-[120px] opacity-25 animate-blob animation-delay-2000 ${isDark ? 'bg-amber-600' : 'bg-amber-200'}`}></div>
            <div className={`absolute -bottom-32 left-[15%] w-[550px] h-[550px] rounded-full ${blendMode} filter blur-[120px] opacity-20 animate-blob animation-delay-4000 ${isDark ? 'bg-teal-600' : 'bg-teal-200'}`}></div>
            <div className={`absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full ${blendMode} filter blur-[120px] opacity-20 animate-blob animation-delay-1000 ${isDark ? 'bg-lime-600' : 'bg-lime-100'}`}></div>
            <div className={`absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full ${blendMode} filter blur-[140px] opacity-10 animate-blob animation-delay-2000 ${isDark ? 'bg-green-500' : 'bg-green-100'}`}></div>
        </div>
    );
};

export default BackgroundAnimation;
