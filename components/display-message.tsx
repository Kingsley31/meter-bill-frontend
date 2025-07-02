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

export const displaySuccess = (title: string, message: string) => {
                toast.success(
                    <div>
                        <h2 className="font-bold">{title}</h2>
                        <p className="font-light">{message}</p>
                    </div>,
                    {
                        style: { background: '#f0fff4', color: '#16a34a' },
                        duration: 4000,
                    }
                );
              }