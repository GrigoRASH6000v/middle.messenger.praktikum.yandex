import { iconUser } from '../ui/icons/iconUser';

export const navigationTemplate = `<nav class="navigation">
    <div class="navigation__item navigation__item--logo">
        <i class="fas fa-icons logo-icon"></i>
    </div>
    <div class="items-wrp">
        <a href="/personal-account" class="router-link navigation__item">
            <i class="far fa-user"></i>
        </a>
        <a href="/" class="router-link navigation__item">
            <i class="far fa-comments"></i>
        </a>
    </div>
</nav>`;
