import React from 'react';

const PhotoGrid = () => {
    const images = [
        {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Y1oFNQkG1We2L0MNF7Kt1-7KiMRzBb3t9JnjoNr3aWMa9dMbmCuFpLtHKOJFVMG5ez9Egv45yDa_K3aMKhzr_NAYiDgp0GVfDlTc_3BYnD36XT5gZrrAnpdJIMCSubQ43rnHSNjSgDGSpB9rKAA06iFl7ODaXHqcRJmZBIR2Mhf0GhndjcxGi9JUcPh4CY_tYYQCUyP03JuU9ybDvGtFLL2Ux7_NEwQljcYtm6XNbfeBx_7FIX4Okf85f4-L9scD8D-A1HwOZDQ',
            alt: 'Spacious modern bedroom with study desk overlooking the Belihuloya hills',
            colSpan: 'md:col-span-2',
            rowSpan: 'md:row-span-2'
        },
        {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3g6sKBMEggo7p0QDDlg4ULBq84CKdxu5uCRDVg2tY-VjNQYQLv3C0wEXqhjhMGq6p6yWMs_6ogZgtafNjyR-TeRD8gEc3-CsnOf--GLAiQRLymUX0GprXRPXgSDozleXaJ4rsWeraUAulmZJzWLl2Up_8XlmBj6k5lgXGxkzflfZh6EYA0qxRtSAmzmtt49fdrjpjf4_TMlHQ-OYYOjx1tXVHXz9wm9Ji8K_VcK-Cy_87e_q5f7TbTsCHc7aiM5o7nbBPBJtUVHY',
            alt: 'Clean tiled bathroom',
            colSpan: ''
        },
        {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCsA04Rw25lyomrpZ5y3d6TVjuP_85_gu75HhL6boGsnqDsYBENScpjg5UC-lO1Z6K8M1Qs31FqeOyF1sbq3Q-CIDnLs1AHM-mJrpI1b7shDgC1MZdmnsTEkTAhrtPCYLsP6AYbHUXwB-QkJX-8VDsvbS-kped1X-Pw-0dbpi29pJf7JUJeGyvuUiyj22x9on4KEhaYPH4xziXrY3kl8ypqgNqM97XgCLiSAZsZONozQq45Ihy1XMS7Z7w7qKtMvk_xf8t5Bqo64I',
            alt: 'Study area with bookshelf',
            colSpan: ''
        },
        {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArlNJU6LGLyxibxFnnZ8UcarI08kqAaqAJp5m7oCAwWF5nbwtMdpIuAzeh7b4H6JGRNSbnSXD1_4M7mYozgCnognzTRxef9ZRKqYnYFu0AL2WPgQ8DFrabqG33U3Joh3__Hgs_h8f-TfFQsJsiPwlra1m_6ewn0h002t21DjJeGqzc7NS1cYEKMJ6rCksa72eRhhmai4x8zLAKsN04XSlZ-2uYL30xdMOZ_g30IbTd6Yn8631yCOj11nkzGwevhyqGCpRo9eHZwyo',
            alt: 'Shared kitchen area',
            colSpan: ''
        },
        {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuqeZKgYUk0ZP6SGi1rxx8_LK6v1PuYzKuW_J4SkJBTpBCuyEQ3Mb9WgM0C2dcbz8aeSTudvmwgj7IAur60gTITLZWT9quwur44KFv4E0JflCkyEGvVQ8pYO9VkOjn8C-2wyY9HJ-oRL0BJjzlcSTkNJxjC3_FUHKQAqnLEl63qWU2tUlSaR2mXTYBvsn3991Q1p8AkFlHGgreH8y96xSvnh5qFY3KjL-HVqnNBttrHz7uQb4ct3sVlullpd0A1eNwFpeJ0uo1nk',
            alt: 'View of the Belihuloya landscape from the balcony',
            colSpan: '',
            showButton: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${image.colSpan} ${image.rowSpan} relative group cursor-pointer ${index > 0 ? 'hidden md:block' : ''}`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${image.url}')` }}
                        alt={image.alt}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    {image.showButton && (
                        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-white transition-colors">
                            Show all photos
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;