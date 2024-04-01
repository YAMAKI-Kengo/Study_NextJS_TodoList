import Image from 'next/image';

export function NextImage() {
    return (
        <div className={`fixed top-0 left-0 w-full h-screen z-[-1]`}>
    <Image src="/mizutama.png"  layout={`fill`} objectFit={`cover`} alt={''} />
    </div>
    )
}