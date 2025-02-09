import "framer-motion";

declare module "framer-motion" {
    interface AnimatePresenceProps {
        children: React.ReactNode;
    }
}