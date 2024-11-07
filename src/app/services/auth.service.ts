import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
    id: number;
    username: string;
    fullName: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor() {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string, rememberMe: boolean): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.username === username && u.password === password);

        if (user) {
            const { password, ...userWithoutPassword } = user;
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            }
            this.currentUserSubject.next(userWithoutPassword);
            return true;
        }
        return false;
    }

    register(userData: any): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some((u: any) => u.username === userData.username)) {
            return false;
        }

        const newUser = {
            ...userData,
            id: Date.now()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    updateUser(userData: any): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = this.currentUserValue;

        if (!currentUser) return false;

        const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

        if (userIndex === -1) return false;

        // Verificar si el nuevo nombre de usuario ya existe en otro usuario
        if (userData.username !== users[userIndex].username &&
            users.some((u: any, index: number) => index !== userIndex && u.username === userData.username)) {
            return false;
        }

        // Actualizar datos del usuario
        users[userIndex] = {
            ...users[userIndex],
            ...userData,
            id: currentUser.id // Mantener el ID original
        };

        localStorage.setItem('users', JSON.stringify(users));

        // Actualizar el usuario actual en localStorage y en el BehaviorSubject
        const { password, ...userWithoutPassword } = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        this.currentUserSubject.next(userWithoutPassword);

        return true;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return this.currentUserValue !== null;
    }
}