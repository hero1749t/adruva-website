import os

files_to_update = [
    "D:/adruva-website/.env.production.local",
    "D:/adruva-website/.env.production.pulled",
    "D:/adruva-website/.env.production.pulled.latest",
    "D:/adruva-website/.env.production.pulled.new",
    "D:/adruva-website/apps/api/.env",
    "D:/adruva-website/apps/api/src/test-notifications.ts",
    "D:/adruva-website/apps/api/src/modules/inquiries/inquiries.service.spec.ts",
    "D:/adruva-website/apps/api/src/modules/inquiries/dto/create-inquiry.dto.spec.ts",
    "D:/adruva-website/apps/web/.env.local",
    "D:/adruva-website/apps/web/app/admin/settings/page.tsx",
    "D:/adruva-website/apps/web/app/careers/[slug]/JobDetailClient.tsx",
    "D:/adruva-website/apps/web/app/contact/ContactPageClient.tsx",
    "D:/adruva-website/apps/web/components/layout/FloatingWhatsApp.tsx",
    "D:/adruva-website/apps/web/components/layout/Footer.tsx",
    "D:/adruva-website/apps/web/components/layout/MobileBottomBar.tsx"
]

replacements = [
    ("919876543210", "918383877088"),
    ("9876543210", "8383877088"),
    ("98765 43210", "83838 77088"),
    ("+91 98765 43210", "+91 83838 77088"),
    ("+919876543210", "+918383877088")
]

for path in files_to_update:
    if not os.path.exists(path):
        continue
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for old, new in replacements:
            content = content.replace(old, new)
        
        if content != original_content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully updated file: {path}")
    except Exception as e:
        print(f"Error updating file {path}: {e}")
