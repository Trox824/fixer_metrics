
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AgentExecution
 * 
 */
export type AgentExecution = $Result.DefaultSelection<Prisma.$AgentExecutionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AgentExecutions
 * const agentExecutions = await prisma.agentExecution.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AgentExecutions
   * const agentExecutions = await prisma.agentExecution.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agentExecution`: Exposes CRUD operations for the **AgentExecution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentExecutions
    * const agentExecutions = await prisma.agentExecution.findMany()
    * ```
    */
  get agentExecution(): Prisma.AgentExecutionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AgentExecution: 'AgentExecution'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agentExecution"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AgentExecution: {
        payload: Prisma.$AgentExecutionPayload<ExtArgs>
        fields: Prisma.AgentExecutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentExecutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentExecutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>
          }
          findFirst: {
            args: Prisma.AgentExecutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentExecutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>
          }
          findMany: {
            args: Prisma.AgentExecutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>[]
          }
          create: {
            args: Prisma.AgentExecutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>
          }
          createMany: {
            args: Prisma.AgentExecutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentExecutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>[]
          }
          delete: {
            args: Prisma.AgentExecutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>
          }
          update: {
            args: Prisma.AgentExecutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>
          }
          deleteMany: {
            args: Prisma.AgentExecutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentExecutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentExecutionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>[]
          }
          upsert: {
            args: Prisma.AgentExecutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentExecutionPayload>
          }
          aggregate: {
            args: Prisma.AgentExecutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentExecution>
          }
          groupBy: {
            args: Prisma.AgentExecutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentExecutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentExecutionCountArgs<ExtArgs>
            result: $Utils.Optional<AgentExecutionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agentExecution?: AgentExecutionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model AgentExecution
   */

  export type AggregateAgentExecution = {
    _count: AgentExecutionCountAggregateOutputType | null
    _avg: AgentExecutionAvgAggregateOutputType | null
    _sum: AgentExecutionSumAggregateOutputType | null
    _min: AgentExecutionMinAggregateOutputType | null
    _max: AgentExecutionMaxAggregateOutputType | null
  }

  export type AgentExecutionAvgAggregateOutputType = {
    feedId: number | null
    runStartId: number | null
    llmCallCount: number | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cacheCreationInputTokens: number | null
    cacheReadInputTokens: number | null
    toolCallsCount: number | null
    durationMs: number | null
    taskIndex: number | null
    temperature: number | null
    maxTokens: number | null
    reportedCostUsd: Decimal | null
  }

  export type AgentExecutionSumAggregateOutputType = {
    feedId: number | null
    runStartId: number | null
    llmCallCount: number | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cacheCreationInputTokens: number | null
    cacheReadInputTokens: number | null
    toolCallsCount: number | null
    durationMs: number | null
    taskIndex: number | null
    temperature: number | null
    maxTokens: number | null
    reportedCostUsd: Decimal | null
  }

  export type AgentExecutionMinAggregateOutputType = {
    id: string | null
    feedId: number | null
    runStartId: number | null
    invocationId: string | null
    status: string | null
    errorMessage: string | null
    model: string | null
    llmCallCount: number | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cacheCreationInputTokens: number | null
    cacheReadInputTokens: number | null
    toolCallsCount: number | null
    startTime: Date | null
    endTime: Date | null
    durationMs: number | null
    taskIndex: number | null
    temperature: number | null
    maxTokens: number | null
    reportedCostUsd: Decimal | null
    createdAt: Date | null
  }

  export type AgentExecutionMaxAggregateOutputType = {
    id: string | null
    feedId: number | null
    runStartId: number | null
    invocationId: string | null
    status: string | null
    errorMessage: string | null
    model: string | null
    llmCallCount: number | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cacheCreationInputTokens: number | null
    cacheReadInputTokens: number | null
    toolCallsCount: number | null
    startTime: Date | null
    endTime: Date | null
    durationMs: number | null
    taskIndex: number | null
    temperature: number | null
    maxTokens: number | null
    reportedCostUsd: Decimal | null
    createdAt: Date | null
  }

  export type AgentExecutionCountAggregateOutputType = {
    id: number
    feedId: number
    runStartId: number
    invocationId: number
    status: number
    errorMessage: number
    model: number
    llmCallCount: number
    inputTokens: number
    outputTokens: number
    totalTokens: number
    cacheCreationInputTokens: number
    cacheReadInputTokens: number
    toolCallsCount: number
    modifiedFiles: number
    startTime: number
    endTime: number
    durationMs: number
    taskIndex: number
    temperature: number
    maxTokens: number
    reportedCostUsd: number
    createdAt: number
    _all: number
  }


  export type AgentExecutionAvgAggregateInputType = {
    feedId?: true
    runStartId?: true
    llmCallCount?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cacheCreationInputTokens?: true
    cacheReadInputTokens?: true
    toolCallsCount?: true
    durationMs?: true
    taskIndex?: true
    temperature?: true
    maxTokens?: true
    reportedCostUsd?: true
  }

  export type AgentExecutionSumAggregateInputType = {
    feedId?: true
    runStartId?: true
    llmCallCount?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cacheCreationInputTokens?: true
    cacheReadInputTokens?: true
    toolCallsCount?: true
    durationMs?: true
    taskIndex?: true
    temperature?: true
    maxTokens?: true
    reportedCostUsd?: true
  }

  export type AgentExecutionMinAggregateInputType = {
    id?: true
    feedId?: true
    runStartId?: true
    invocationId?: true
    status?: true
    errorMessage?: true
    model?: true
    llmCallCount?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cacheCreationInputTokens?: true
    cacheReadInputTokens?: true
    toolCallsCount?: true
    startTime?: true
    endTime?: true
    durationMs?: true
    taskIndex?: true
    temperature?: true
    maxTokens?: true
    reportedCostUsd?: true
    createdAt?: true
  }

  export type AgentExecutionMaxAggregateInputType = {
    id?: true
    feedId?: true
    runStartId?: true
    invocationId?: true
    status?: true
    errorMessage?: true
    model?: true
    llmCallCount?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cacheCreationInputTokens?: true
    cacheReadInputTokens?: true
    toolCallsCount?: true
    startTime?: true
    endTime?: true
    durationMs?: true
    taskIndex?: true
    temperature?: true
    maxTokens?: true
    reportedCostUsd?: true
    createdAt?: true
  }

  export type AgentExecutionCountAggregateInputType = {
    id?: true
    feedId?: true
    runStartId?: true
    invocationId?: true
    status?: true
    errorMessage?: true
    model?: true
    llmCallCount?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cacheCreationInputTokens?: true
    cacheReadInputTokens?: true
    toolCallsCount?: true
    modifiedFiles?: true
    startTime?: true
    endTime?: true
    durationMs?: true
    taskIndex?: true
    temperature?: true
    maxTokens?: true
    reportedCostUsd?: true
    createdAt?: true
    _all?: true
  }

  export type AgentExecutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentExecution to aggregate.
     */
    where?: AgentExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentExecutions to fetch.
     */
    orderBy?: AgentExecutionOrderByWithRelationInput | AgentExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentExecutions
    **/
    _count?: true | AgentExecutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentExecutionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentExecutionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentExecutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentExecutionMaxAggregateInputType
  }

  export type GetAgentExecutionAggregateType<T extends AgentExecutionAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentExecution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentExecution[P]>
      : GetScalarType<T[P], AggregateAgentExecution[P]>
  }




  export type AgentExecutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentExecutionWhereInput
    orderBy?: AgentExecutionOrderByWithAggregationInput | AgentExecutionOrderByWithAggregationInput[]
    by: AgentExecutionScalarFieldEnum[] | AgentExecutionScalarFieldEnum
    having?: AgentExecutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentExecutionCountAggregateInputType | true
    _avg?: AgentExecutionAvgAggregateInputType
    _sum?: AgentExecutionSumAggregateInputType
    _min?: AgentExecutionMinAggregateInputType
    _max?: AgentExecutionMaxAggregateInputType
  }

  export type AgentExecutionGroupByOutputType = {
    id: string
    feedId: number | null
    runStartId: number | null
    invocationId: string | null
    status: string
    errorMessage: string | null
    model: string
    llmCallCount: number
    inputTokens: number
    outputTokens: number
    totalTokens: number
    cacheCreationInputTokens: number | null
    cacheReadInputTokens: number | null
    toolCallsCount: number
    modifiedFiles: string[]
    startTime: Date
    endTime: Date | null
    durationMs: number | null
    taskIndex: number | null
    temperature: number | null
    maxTokens: number | null
    reportedCostUsd: Decimal | null
    createdAt: Date
    _count: AgentExecutionCountAggregateOutputType | null
    _avg: AgentExecutionAvgAggregateOutputType | null
    _sum: AgentExecutionSumAggregateOutputType | null
    _min: AgentExecutionMinAggregateOutputType | null
    _max: AgentExecutionMaxAggregateOutputType | null
  }

  type GetAgentExecutionGroupByPayload<T extends AgentExecutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentExecutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentExecutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentExecutionGroupByOutputType[P]>
            : GetScalarType<T[P], AgentExecutionGroupByOutputType[P]>
        }
      >
    >


  export type AgentExecutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    feedId?: boolean
    runStartId?: boolean
    invocationId?: boolean
    status?: boolean
    errorMessage?: boolean
    model?: boolean
    llmCallCount?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cacheCreationInputTokens?: boolean
    cacheReadInputTokens?: boolean
    toolCallsCount?: boolean
    modifiedFiles?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    taskIndex?: boolean
    temperature?: boolean
    maxTokens?: boolean
    reportedCostUsd?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["agentExecution"]>

  export type AgentExecutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    feedId?: boolean
    runStartId?: boolean
    invocationId?: boolean
    status?: boolean
    errorMessage?: boolean
    model?: boolean
    llmCallCount?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cacheCreationInputTokens?: boolean
    cacheReadInputTokens?: boolean
    toolCallsCount?: boolean
    modifiedFiles?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    taskIndex?: boolean
    temperature?: boolean
    maxTokens?: boolean
    reportedCostUsd?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["agentExecution"]>

  export type AgentExecutionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    feedId?: boolean
    runStartId?: boolean
    invocationId?: boolean
    status?: boolean
    errorMessage?: boolean
    model?: boolean
    llmCallCount?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cacheCreationInputTokens?: boolean
    cacheReadInputTokens?: boolean
    toolCallsCount?: boolean
    modifiedFiles?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    taskIndex?: boolean
    temperature?: boolean
    maxTokens?: boolean
    reportedCostUsd?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["agentExecution"]>

  export type AgentExecutionSelectScalar = {
    id?: boolean
    feedId?: boolean
    runStartId?: boolean
    invocationId?: boolean
    status?: boolean
    errorMessage?: boolean
    model?: boolean
    llmCallCount?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cacheCreationInputTokens?: boolean
    cacheReadInputTokens?: boolean
    toolCallsCount?: boolean
    modifiedFiles?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    taskIndex?: boolean
    temperature?: boolean
    maxTokens?: boolean
    reportedCostUsd?: boolean
    createdAt?: boolean
  }

  export type AgentExecutionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "feedId" | "runStartId" | "invocationId" | "status" | "errorMessage" | "model" | "llmCallCount" | "inputTokens" | "outputTokens" | "totalTokens" | "cacheCreationInputTokens" | "cacheReadInputTokens" | "toolCallsCount" | "modifiedFiles" | "startTime" | "endTime" | "durationMs" | "taskIndex" | "temperature" | "maxTokens" | "reportedCostUsd" | "createdAt", ExtArgs["result"]["agentExecution"]>

  export type $AgentExecutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentExecution"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      feedId: number | null
      runStartId: number | null
      invocationId: string | null
      status: string
      errorMessage: string | null
      model: string
      llmCallCount: number
      inputTokens: number
      outputTokens: number
      totalTokens: number
      cacheCreationInputTokens: number | null
      cacheReadInputTokens: number | null
      toolCallsCount: number
      modifiedFiles: string[]
      startTime: Date
      endTime: Date | null
      durationMs: number | null
      taskIndex: number | null
      temperature: number | null
      maxTokens: number | null
      reportedCostUsd: Prisma.Decimal | null
      createdAt: Date
    }, ExtArgs["result"]["agentExecution"]>
    composites: {}
  }

  type AgentExecutionGetPayload<S extends boolean | null | undefined | AgentExecutionDefaultArgs> = $Result.GetResult<Prisma.$AgentExecutionPayload, S>

  type AgentExecutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentExecutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentExecutionCountAggregateInputType | true
    }

  export interface AgentExecutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentExecution'], meta: { name: 'AgentExecution' } }
    /**
     * Find zero or one AgentExecution that matches the filter.
     * @param {AgentExecutionFindUniqueArgs} args - Arguments to find a AgentExecution
     * @example
     * // Get one AgentExecution
     * const agentExecution = await prisma.agentExecution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentExecutionFindUniqueArgs>(args: SelectSubset<T, AgentExecutionFindUniqueArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentExecution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentExecutionFindUniqueOrThrowArgs} args - Arguments to find a AgentExecution
     * @example
     * // Get one AgentExecution
     * const agentExecution = await prisma.agentExecution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentExecutionFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentExecutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentExecution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentExecutionFindFirstArgs} args - Arguments to find a AgentExecution
     * @example
     * // Get one AgentExecution
     * const agentExecution = await prisma.agentExecution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentExecutionFindFirstArgs>(args?: SelectSubset<T, AgentExecutionFindFirstArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentExecution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentExecutionFindFirstOrThrowArgs} args - Arguments to find a AgentExecution
     * @example
     * // Get one AgentExecution
     * const agentExecution = await prisma.agentExecution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentExecutionFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentExecutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentExecutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentExecutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentExecutions
     * const agentExecutions = await prisma.agentExecution.findMany()
     * 
     * // Get first 10 AgentExecutions
     * const agentExecutions = await prisma.agentExecution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentExecutionWithIdOnly = await prisma.agentExecution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentExecutionFindManyArgs>(args?: SelectSubset<T, AgentExecutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentExecution.
     * @param {AgentExecutionCreateArgs} args - Arguments to create a AgentExecution.
     * @example
     * // Create one AgentExecution
     * const AgentExecution = await prisma.agentExecution.create({
     *   data: {
     *     // ... data to create a AgentExecution
     *   }
     * })
     * 
     */
    create<T extends AgentExecutionCreateArgs>(args: SelectSubset<T, AgentExecutionCreateArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentExecutions.
     * @param {AgentExecutionCreateManyArgs} args - Arguments to create many AgentExecutions.
     * @example
     * // Create many AgentExecutions
     * const agentExecution = await prisma.agentExecution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentExecutionCreateManyArgs>(args?: SelectSubset<T, AgentExecutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentExecutions and returns the data saved in the database.
     * @param {AgentExecutionCreateManyAndReturnArgs} args - Arguments to create many AgentExecutions.
     * @example
     * // Create many AgentExecutions
     * const agentExecution = await prisma.agentExecution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentExecutions and only return the `id`
     * const agentExecutionWithIdOnly = await prisma.agentExecution.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentExecutionCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentExecutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentExecution.
     * @param {AgentExecutionDeleteArgs} args - Arguments to delete one AgentExecution.
     * @example
     * // Delete one AgentExecution
     * const AgentExecution = await prisma.agentExecution.delete({
     *   where: {
     *     // ... filter to delete one AgentExecution
     *   }
     * })
     * 
     */
    delete<T extends AgentExecutionDeleteArgs>(args: SelectSubset<T, AgentExecutionDeleteArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentExecution.
     * @param {AgentExecutionUpdateArgs} args - Arguments to update one AgentExecution.
     * @example
     * // Update one AgentExecution
     * const agentExecution = await prisma.agentExecution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentExecutionUpdateArgs>(args: SelectSubset<T, AgentExecutionUpdateArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentExecutions.
     * @param {AgentExecutionDeleteManyArgs} args - Arguments to filter AgentExecutions to delete.
     * @example
     * // Delete a few AgentExecutions
     * const { count } = await prisma.agentExecution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentExecutionDeleteManyArgs>(args?: SelectSubset<T, AgentExecutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentExecutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentExecutions
     * const agentExecution = await prisma.agentExecution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentExecutionUpdateManyArgs>(args: SelectSubset<T, AgentExecutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentExecutions and returns the data updated in the database.
     * @param {AgentExecutionUpdateManyAndReturnArgs} args - Arguments to update many AgentExecutions.
     * @example
     * // Update many AgentExecutions
     * const agentExecution = await prisma.agentExecution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentExecutions and only return the `id`
     * const agentExecutionWithIdOnly = await prisma.agentExecution.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentExecutionUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentExecutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentExecution.
     * @param {AgentExecutionUpsertArgs} args - Arguments to update or create a AgentExecution.
     * @example
     * // Update or create a AgentExecution
     * const agentExecution = await prisma.agentExecution.upsert({
     *   create: {
     *     // ... data to create a AgentExecution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentExecution we want to update
     *   }
     * })
     */
    upsert<T extends AgentExecutionUpsertArgs>(args: SelectSubset<T, AgentExecutionUpsertArgs<ExtArgs>>): Prisma__AgentExecutionClient<$Result.GetResult<Prisma.$AgentExecutionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentExecutionCountArgs} args - Arguments to filter AgentExecutions to count.
     * @example
     * // Count the number of AgentExecutions
     * const count = await prisma.agentExecution.count({
     *   where: {
     *     // ... the filter for the AgentExecutions we want to count
     *   }
     * })
    **/
    count<T extends AgentExecutionCountArgs>(
      args?: Subset<T, AgentExecutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentExecutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentExecutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentExecutionAggregateArgs>(args: Subset<T, AgentExecutionAggregateArgs>): Prisma.PrismaPromise<GetAgentExecutionAggregateType<T>>

    /**
     * Group by AgentExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentExecutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentExecutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentExecutionGroupByArgs['orderBy'] }
        : { orderBy?: AgentExecutionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentExecutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentExecutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentExecution model
   */
  readonly fields: AgentExecutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentExecution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentExecutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentExecution model
   */
  interface AgentExecutionFieldRefs {
    readonly id: FieldRef<"AgentExecution", 'String'>
    readonly feedId: FieldRef<"AgentExecution", 'Int'>
    readonly runStartId: FieldRef<"AgentExecution", 'Int'>
    readonly invocationId: FieldRef<"AgentExecution", 'String'>
    readonly status: FieldRef<"AgentExecution", 'String'>
    readonly errorMessage: FieldRef<"AgentExecution", 'String'>
    readonly model: FieldRef<"AgentExecution", 'String'>
    readonly llmCallCount: FieldRef<"AgentExecution", 'Int'>
    readonly inputTokens: FieldRef<"AgentExecution", 'Int'>
    readonly outputTokens: FieldRef<"AgentExecution", 'Int'>
    readonly totalTokens: FieldRef<"AgentExecution", 'Int'>
    readonly cacheCreationInputTokens: FieldRef<"AgentExecution", 'Int'>
    readonly cacheReadInputTokens: FieldRef<"AgentExecution", 'Int'>
    readonly toolCallsCount: FieldRef<"AgentExecution", 'Int'>
    readonly modifiedFiles: FieldRef<"AgentExecution", 'String[]'>
    readonly startTime: FieldRef<"AgentExecution", 'DateTime'>
    readonly endTime: FieldRef<"AgentExecution", 'DateTime'>
    readonly durationMs: FieldRef<"AgentExecution", 'Int'>
    readonly taskIndex: FieldRef<"AgentExecution", 'Int'>
    readonly temperature: FieldRef<"AgentExecution", 'Float'>
    readonly maxTokens: FieldRef<"AgentExecution", 'Int'>
    readonly reportedCostUsd: FieldRef<"AgentExecution", 'Decimal'>
    readonly createdAt: FieldRef<"AgentExecution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentExecution findUnique
   */
  export type AgentExecutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * Filter, which AgentExecution to fetch.
     */
    where: AgentExecutionWhereUniqueInput
  }

  /**
   * AgentExecution findUniqueOrThrow
   */
  export type AgentExecutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * Filter, which AgentExecution to fetch.
     */
    where: AgentExecutionWhereUniqueInput
  }

  /**
   * AgentExecution findFirst
   */
  export type AgentExecutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * Filter, which AgentExecution to fetch.
     */
    where?: AgentExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentExecutions to fetch.
     */
    orderBy?: AgentExecutionOrderByWithRelationInput | AgentExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentExecutions.
     */
    cursor?: AgentExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentExecutions.
     */
    distinct?: AgentExecutionScalarFieldEnum | AgentExecutionScalarFieldEnum[]
  }

  /**
   * AgentExecution findFirstOrThrow
   */
  export type AgentExecutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * Filter, which AgentExecution to fetch.
     */
    where?: AgentExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentExecutions to fetch.
     */
    orderBy?: AgentExecutionOrderByWithRelationInput | AgentExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentExecutions.
     */
    cursor?: AgentExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentExecutions.
     */
    distinct?: AgentExecutionScalarFieldEnum | AgentExecutionScalarFieldEnum[]
  }

  /**
   * AgentExecution findMany
   */
  export type AgentExecutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * Filter, which AgentExecutions to fetch.
     */
    where?: AgentExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentExecutions to fetch.
     */
    orderBy?: AgentExecutionOrderByWithRelationInput | AgentExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentExecutions.
     */
    cursor?: AgentExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentExecutions.
     */
    skip?: number
    distinct?: AgentExecutionScalarFieldEnum | AgentExecutionScalarFieldEnum[]
  }

  /**
   * AgentExecution create
   */
  export type AgentExecutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * The data needed to create a AgentExecution.
     */
    data: XOR<AgentExecutionCreateInput, AgentExecutionUncheckedCreateInput>
  }

  /**
   * AgentExecution createMany
   */
  export type AgentExecutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentExecutions.
     */
    data: AgentExecutionCreateManyInput | AgentExecutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentExecution createManyAndReturn
   */
  export type AgentExecutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * The data used to create many AgentExecutions.
     */
    data: AgentExecutionCreateManyInput | AgentExecutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentExecution update
   */
  export type AgentExecutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * The data needed to update a AgentExecution.
     */
    data: XOR<AgentExecutionUpdateInput, AgentExecutionUncheckedUpdateInput>
    /**
     * Choose, which AgentExecution to update.
     */
    where: AgentExecutionWhereUniqueInput
  }

  /**
   * AgentExecution updateMany
   */
  export type AgentExecutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentExecutions.
     */
    data: XOR<AgentExecutionUpdateManyMutationInput, AgentExecutionUncheckedUpdateManyInput>
    /**
     * Filter which AgentExecutions to update
     */
    where?: AgentExecutionWhereInput
    /**
     * Limit how many AgentExecutions to update.
     */
    limit?: number
  }

  /**
   * AgentExecution updateManyAndReturn
   */
  export type AgentExecutionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * The data used to update AgentExecutions.
     */
    data: XOR<AgentExecutionUpdateManyMutationInput, AgentExecutionUncheckedUpdateManyInput>
    /**
     * Filter which AgentExecutions to update
     */
    where?: AgentExecutionWhereInput
    /**
     * Limit how many AgentExecutions to update.
     */
    limit?: number
  }

  /**
   * AgentExecution upsert
   */
  export type AgentExecutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * The filter to search for the AgentExecution to update in case it exists.
     */
    where: AgentExecutionWhereUniqueInput
    /**
     * In case the AgentExecution found by the `where` argument doesn't exist, create a new AgentExecution with this data.
     */
    create: XOR<AgentExecutionCreateInput, AgentExecutionUncheckedCreateInput>
    /**
     * In case the AgentExecution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentExecutionUpdateInput, AgentExecutionUncheckedUpdateInput>
  }

  /**
   * AgentExecution delete
   */
  export type AgentExecutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
    /**
     * Filter which AgentExecution to delete.
     */
    where: AgentExecutionWhereUniqueInput
  }

  /**
   * AgentExecution deleteMany
   */
  export type AgentExecutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentExecutions to delete
     */
    where?: AgentExecutionWhereInput
    /**
     * Limit how many AgentExecutions to delete.
     */
    limit?: number
  }

  /**
   * AgentExecution without action
   */
  export type AgentExecutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentExecution
     */
    select?: AgentExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentExecution
     */
    omit?: AgentExecutionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgentExecutionScalarFieldEnum: {
    id: 'id',
    feedId: 'feedId',
    runStartId: 'runStartId',
    invocationId: 'invocationId',
    status: 'status',
    errorMessage: 'errorMessage',
    model: 'model',
    llmCallCount: 'llmCallCount',
    inputTokens: 'inputTokens',
    outputTokens: 'outputTokens',
    totalTokens: 'totalTokens',
    cacheCreationInputTokens: 'cacheCreationInputTokens',
    cacheReadInputTokens: 'cacheReadInputTokens',
    toolCallsCount: 'toolCallsCount',
    modifiedFiles: 'modifiedFiles',
    startTime: 'startTime',
    endTime: 'endTime',
    durationMs: 'durationMs',
    taskIndex: 'taskIndex',
    temperature: 'temperature',
    maxTokens: 'maxTokens',
    reportedCostUsd: 'reportedCostUsd',
    createdAt: 'createdAt'
  };

  export type AgentExecutionScalarFieldEnum = (typeof AgentExecutionScalarFieldEnum)[keyof typeof AgentExecutionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
  /**
   * Deep Input Types
   */


  export type AgentExecutionWhereInput = {
    AND?: AgentExecutionWhereInput | AgentExecutionWhereInput[]
    OR?: AgentExecutionWhereInput[]
    NOT?: AgentExecutionWhereInput | AgentExecutionWhereInput[]
    id?: StringFilter<"AgentExecution"> | string
    feedId?: IntNullableFilter<"AgentExecution"> | number | null
    runStartId?: IntNullableFilter<"AgentExecution"> | number | null
    invocationId?: StringNullableFilter<"AgentExecution"> | string | null
    status?: StringFilter<"AgentExecution"> | string
    errorMessage?: StringNullableFilter<"AgentExecution"> | string | null
    model?: StringFilter<"AgentExecution"> | string
    llmCallCount?: IntFilter<"AgentExecution"> | number
    inputTokens?: IntFilter<"AgentExecution"> | number
    outputTokens?: IntFilter<"AgentExecution"> | number
    totalTokens?: IntFilter<"AgentExecution"> | number
    cacheCreationInputTokens?: IntNullableFilter<"AgentExecution"> | number | null
    cacheReadInputTokens?: IntNullableFilter<"AgentExecution"> | number | null
    toolCallsCount?: IntFilter<"AgentExecution"> | number
    modifiedFiles?: StringNullableListFilter<"AgentExecution">
    startTime?: DateTimeFilter<"AgentExecution"> | Date | string
    endTime?: DateTimeNullableFilter<"AgentExecution"> | Date | string | null
    durationMs?: IntNullableFilter<"AgentExecution"> | number | null
    taskIndex?: IntNullableFilter<"AgentExecution"> | number | null
    temperature?: FloatNullableFilter<"AgentExecution"> | number | null
    maxTokens?: IntNullableFilter<"AgentExecution"> | number | null
    reportedCostUsd?: DecimalNullableFilter<"AgentExecution"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"AgentExecution"> | Date | string
  }

  export type AgentExecutionOrderByWithRelationInput = {
    id?: SortOrder
    feedId?: SortOrderInput | SortOrder
    runStartId?: SortOrderInput | SortOrder
    invocationId?: SortOrderInput | SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    model?: SortOrder
    llmCallCount?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cacheCreationInputTokens?: SortOrderInput | SortOrder
    cacheReadInputTokens?: SortOrderInput | SortOrder
    toolCallsCount?: SortOrder
    modifiedFiles?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    taskIndex?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    maxTokens?: SortOrderInput | SortOrder
    reportedCostUsd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AgentExecutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invocationId?: string
    AND?: AgentExecutionWhereInput | AgentExecutionWhereInput[]
    OR?: AgentExecutionWhereInput[]
    NOT?: AgentExecutionWhereInput | AgentExecutionWhereInput[]
    feedId?: IntNullableFilter<"AgentExecution"> | number | null
    runStartId?: IntNullableFilter<"AgentExecution"> | number | null
    status?: StringFilter<"AgentExecution"> | string
    errorMessage?: StringNullableFilter<"AgentExecution"> | string | null
    model?: StringFilter<"AgentExecution"> | string
    llmCallCount?: IntFilter<"AgentExecution"> | number
    inputTokens?: IntFilter<"AgentExecution"> | number
    outputTokens?: IntFilter<"AgentExecution"> | number
    totalTokens?: IntFilter<"AgentExecution"> | number
    cacheCreationInputTokens?: IntNullableFilter<"AgentExecution"> | number | null
    cacheReadInputTokens?: IntNullableFilter<"AgentExecution"> | number | null
    toolCallsCount?: IntFilter<"AgentExecution"> | number
    modifiedFiles?: StringNullableListFilter<"AgentExecution">
    startTime?: DateTimeFilter<"AgentExecution"> | Date | string
    endTime?: DateTimeNullableFilter<"AgentExecution"> | Date | string | null
    durationMs?: IntNullableFilter<"AgentExecution"> | number | null
    taskIndex?: IntNullableFilter<"AgentExecution"> | number | null
    temperature?: FloatNullableFilter<"AgentExecution"> | number | null
    maxTokens?: IntNullableFilter<"AgentExecution"> | number | null
    reportedCostUsd?: DecimalNullableFilter<"AgentExecution"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"AgentExecution"> | Date | string
  }, "id" | "invocationId">

  export type AgentExecutionOrderByWithAggregationInput = {
    id?: SortOrder
    feedId?: SortOrderInput | SortOrder
    runStartId?: SortOrderInput | SortOrder
    invocationId?: SortOrderInput | SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    model?: SortOrder
    llmCallCount?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cacheCreationInputTokens?: SortOrderInput | SortOrder
    cacheReadInputTokens?: SortOrderInput | SortOrder
    toolCallsCount?: SortOrder
    modifiedFiles?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    taskIndex?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    maxTokens?: SortOrderInput | SortOrder
    reportedCostUsd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AgentExecutionCountOrderByAggregateInput
    _avg?: AgentExecutionAvgOrderByAggregateInput
    _max?: AgentExecutionMaxOrderByAggregateInput
    _min?: AgentExecutionMinOrderByAggregateInput
    _sum?: AgentExecutionSumOrderByAggregateInput
  }

  export type AgentExecutionScalarWhereWithAggregatesInput = {
    AND?: AgentExecutionScalarWhereWithAggregatesInput | AgentExecutionScalarWhereWithAggregatesInput[]
    OR?: AgentExecutionScalarWhereWithAggregatesInput[]
    NOT?: AgentExecutionScalarWhereWithAggregatesInput | AgentExecutionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentExecution"> | string
    feedId?: IntNullableWithAggregatesFilter<"AgentExecution"> | number | null
    runStartId?: IntNullableWithAggregatesFilter<"AgentExecution"> | number | null
    invocationId?: StringNullableWithAggregatesFilter<"AgentExecution"> | string | null
    status?: StringWithAggregatesFilter<"AgentExecution"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"AgentExecution"> | string | null
    model?: StringWithAggregatesFilter<"AgentExecution"> | string
    llmCallCount?: IntWithAggregatesFilter<"AgentExecution"> | number
    inputTokens?: IntWithAggregatesFilter<"AgentExecution"> | number
    outputTokens?: IntWithAggregatesFilter<"AgentExecution"> | number
    totalTokens?: IntWithAggregatesFilter<"AgentExecution"> | number
    cacheCreationInputTokens?: IntNullableWithAggregatesFilter<"AgentExecution"> | number | null
    cacheReadInputTokens?: IntNullableWithAggregatesFilter<"AgentExecution"> | number | null
    toolCallsCount?: IntWithAggregatesFilter<"AgentExecution"> | number
    modifiedFiles?: StringNullableListFilter<"AgentExecution">
    startTime?: DateTimeWithAggregatesFilter<"AgentExecution"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"AgentExecution"> | Date | string | null
    durationMs?: IntNullableWithAggregatesFilter<"AgentExecution"> | number | null
    taskIndex?: IntNullableWithAggregatesFilter<"AgentExecution"> | number | null
    temperature?: FloatNullableWithAggregatesFilter<"AgentExecution"> | number | null
    maxTokens?: IntNullableWithAggregatesFilter<"AgentExecution"> | number | null
    reportedCostUsd?: DecimalNullableWithAggregatesFilter<"AgentExecution"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AgentExecution"> | Date | string
  }

  export type AgentExecutionCreateInput = {
    id?: string
    feedId?: number | null
    runStartId?: number | null
    invocationId?: string | null
    status: string
    errorMessage?: string | null
    model: string
    llmCallCount: number
    inputTokens: number
    outputTokens: number
    totalTokens: number
    cacheCreationInputTokens?: number | null
    cacheReadInputTokens?: number | null
    toolCallsCount: number
    modifiedFiles?: AgentExecutionCreatemodifiedFilesInput | string[]
    startTime: Date | string
    endTime?: Date | string | null
    durationMs?: number | null
    taskIndex?: number | null
    temperature?: number | null
    maxTokens?: number | null
    reportedCostUsd?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type AgentExecutionUncheckedCreateInput = {
    id?: string
    feedId?: number | null
    runStartId?: number | null
    invocationId?: string | null
    status: string
    errorMessage?: string | null
    model: string
    llmCallCount: number
    inputTokens: number
    outputTokens: number
    totalTokens: number
    cacheCreationInputTokens?: number | null
    cacheReadInputTokens?: number | null
    toolCallsCount: number
    modifiedFiles?: AgentExecutionCreatemodifiedFilesInput | string[]
    startTime: Date | string
    endTime?: Date | string | null
    durationMs?: number | null
    taskIndex?: number | null
    temperature?: number | null
    maxTokens?: number | null
    reportedCostUsd?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type AgentExecutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedId?: NullableIntFieldUpdateOperationsInput | number | null
    runStartId?: NullableIntFieldUpdateOperationsInput | number | null
    invocationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    llmCallCount?: IntFieldUpdateOperationsInput | number
    inputTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cacheCreationInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheReadInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    toolCallsCount?: IntFieldUpdateOperationsInput | number
    modifiedFiles?: AgentExecutionUpdatemodifiedFilesInput | string[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    taskIndex?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    reportedCostUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentExecutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedId?: NullableIntFieldUpdateOperationsInput | number | null
    runStartId?: NullableIntFieldUpdateOperationsInput | number | null
    invocationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    llmCallCount?: IntFieldUpdateOperationsInput | number
    inputTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cacheCreationInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheReadInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    toolCallsCount?: IntFieldUpdateOperationsInput | number
    modifiedFiles?: AgentExecutionUpdatemodifiedFilesInput | string[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    taskIndex?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    reportedCostUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentExecutionCreateManyInput = {
    id?: string
    feedId?: number | null
    runStartId?: number | null
    invocationId?: string | null
    status: string
    errorMessage?: string | null
    model: string
    llmCallCount: number
    inputTokens: number
    outputTokens: number
    totalTokens: number
    cacheCreationInputTokens?: number | null
    cacheReadInputTokens?: number | null
    toolCallsCount: number
    modifiedFiles?: AgentExecutionCreatemodifiedFilesInput | string[]
    startTime: Date | string
    endTime?: Date | string | null
    durationMs?: number | null
    taskIndex?: number | null
    temperature?: number | null
    maxTokens?: number | null
    reportedCostUsd?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type AgentExecutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedId?: NullableIntFieldUpdateOperationsInput | number | null
    runStartId?: NullableIntFieldUpdateOperationsInput | number | null
    invocationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    llmCallCount?: IntFieldUpdateOperationsInput | number
    inputTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cacheCreationInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheReadInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    toolCallsCount?: IntFieldUpdateOperationsInput | number
    modifiedFiles?: AgentExecutionUpdatemodifiedFilesInput | string[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    taskIndex?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    reportedCostUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentExecutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedId?: NullableIntFieldUpdateOperationsInput | number | null
    runStartId?: NullableIntFieldUpdateOperationsInput | number | null
    invocationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    llmCallCount?: IntFieldUpdateOperationsInput | number
    inputTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cacheCreationInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cacheReadInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    toolCallsCount?: IntFieldUpdateOperationsInput | number
    modifiedFiles?: AgentExecutionUpdatemodifiedFilesInput | string[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    taskIndex?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    reportedCostUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgentExecutionCountOrderByAggregateInput = {
    id?: SortOrder
    feedId?: SortOrder
    runStartId?: SortOrder
    invocationId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    model?: SortOrder
    llmCallCount?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cacheCreationInputTokens?: SortOrder
    cacheReadInputTokens?: SortOrder
    toolCallsCount?: SortOrder
    modifiedFiles?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationMs?: SortOrder
    taskIndex?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    reportedCostUsd?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentExecutionAvgOrderByAggregateInput = {
    feedId?: SortOrder
    runStartId?: SortOrder
    llmCallCount?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cacheCreationInputTokens?: SortOrder
    cacheReadInputTokens?: SortOrder
    toolCallsCount?: SortOrder
    durationMs?: SortOrder
    taskIndex?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    reportedCostUsd?: SortOrder
  }

  export type AgentExecutionMaxOrderByAggregateInput = {
    id?: SortOrder
    feedId?: SortOrder
    runStartId?: SortOrder
    invocationId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    model?: SortOrder
    llmCallCount?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cacheCreationInputTokens?: SortOrder
    cacheReadInputTokens?: SortOrder
    toolCallsCount?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationMs?: SortOrder
    taskIndex?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    reportedCostUsd?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentExecutionMinOrderByAggregateInput = {
    id?: SortOrder
    feedId?: SortOrder
    runStartId?: SortOrder
    invocationId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    model?: SortOrder
    llmCallCount?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cacheCreationInputTokens?: SortOrder
    cacheReadInputTokens?: SortOrder
    toolCallsCount?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationMs?: SortOrder
    taskIndex?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    reportedCostUsd?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentExecutionSumOrderByAggregateInput = {
    feedId?: SortOrder
    runStartId?: SortOrder
    llmCallCount?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cacheCreationInputTokens?: SortOrder
    cacheReadInputTokens?: SortOrder
    toolCallsCount?: SortOrder
    durationMs?: SortOrder
    taskIndex?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    reportedCostUsd?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type AgentExecutionCreatemodifiedFilesInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgentExecutionUpdatemodifiedFilesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}