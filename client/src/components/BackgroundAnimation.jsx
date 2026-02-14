import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
    const { isDark } = useTheme();
    const blendMode = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className={`absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full ${blendMode} filter blur-3xl opacity-30 animate-blob ${isDark ? 'bg-indigo-600' : 'bg-indigo-300'}`}></div>
            <div className={`absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full ${blendMode} filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${isDark ? 'bg-blue-600' : 'bg-blue-300'}`}></div>
            <div className={`absolute -bottom-32 left-[20%] w-[500px] h-[500px] rounded-full ${blendMode} filter blur-3xl opacity-30 animate-blob animation-delay-4000 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
            <div className={`absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full ${blendMode} filter blur-3xl opacity-30 animate-blob animation-delay-1000 ${isDark ? 'bg-cyan-600' : 'bg-teal-300'}`}></div>
        </div>
    );
};

export default BackgroundAnimation;
