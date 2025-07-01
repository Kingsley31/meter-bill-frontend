import { toast } from "sonner";


export const displayError = (title: string, message: string) => {
                toast.error(
                    <div>
                        <h2 className="font-bold">{title}</h2>
                        <p className="font-light">{message}</p>
                    </div>,
                    {
                        style: { background: '#fff0f0', color: '#dc2626' },
                        duration: 4000,
                    }
                );
              }