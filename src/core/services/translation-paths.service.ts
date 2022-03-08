import { Injectable } from '@angular/core';
import langFile from '../../locals/fr';

// above we imported only the FR `langFile` because all the languages files will be the same.

type GenericClassType<T> = new () => T;
export const GenericClass = <Props>(): GenericClassType<Props> => class {} as GenericClassType<Props>;

const concatIfExistsPath = (path: string, suffix: string): string => (path ? `${path}.${suffix}` : suffix);

const transformObjectToPath = <T extends Record<string, unknown> | string>(
	suffix: string,
	objectToTransformOrEndOfPath: T,
	path = ''
): [string, any] | T =>
	typeof objectToTransformOrEndOfPath === 'object'
		? Object.entries(objectToTransformOrEndOfPath).reduce((objectToTransform, [key, value]) => {
				(<any>objectToTransform)[key] = transformObjectToPath(
					key,
					value as T,
					concatIfExistsPath(path, suffix)
				);

				return objectToTransform;
		  }, {} as T)
		: (concatIfExistsPath(path, suffix) as T);

@Injectable()
export class TranslationPathsService extends GenericClass<typeof langFile>() {
	constructor() {
		super();
		Object.assign(this, transformObjectToPath('', langFile));
	}
}
