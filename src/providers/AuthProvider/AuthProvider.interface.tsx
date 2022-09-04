import { NextPage } from 'next'
import { UserRole } from '../../shared/types/user.interface'

export interface RoleProviderAceess {
	access?: UserRole
}

export type NextPageAuth<P = {}> = NextPage<P> & RoleProviderAceess
export type TypeComponentAuth = {
	children: React.ReactNode
	Component: RoleProviderAceess
}
