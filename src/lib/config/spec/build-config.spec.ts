import { buildConfig } from "../build-config";

describe("build-config", () => {
  it("builds a configuration object", () => {
    const env = {
      NODE_ENV: "development",
      TEST_ENV: "test",
    };

    const expected = {
      nodeEnv: "development",
      testEnv: "test",
    };

    const actual = buildConfig((b) => ({
      nodeEnv: b.required("NODE_ENV"),
      testEnv: b.required("TEST_ENV"),
    }))(env);

    expect(actual).toEqual(expected);
  });

  it("builds a deep configuration object", () => {
    const env = {
      NODE_ENV: "development",
      TEST_ENV: "test",
    };

    const expected = {
      nodeEnv: "development",
      a: { b: { c: { testEnv: "test" } } },
    };

    const actual = buildConfig((b) => ({
      nodeEnv: b.required("NODE_ENV"),
      a: { b: { c: { testEnv: b.required("TEST_ENV") } } },
    }))(env);

    expect(actual).toEqual(expected);
  });

  it("allows falsey values for required items", () => {
    const env = {
      PATH: "",
      COUNT: "0",
    };

    const expected = {
      path: "",
      count: 0,
    };

    const actual = buildConfig((b) => ({
      path: b.required("PATH"),
      count: b.required("COUNT", { coerce: b.coerce.number }),
    }))(env);

    expect(actual).toEqual(expected);
  });

  it("errors on missing required items", () => {
    const env = {
      NODE_ENV: "development",
    };

    expect(() =>
      buildConfig((b) => ({
        nodeEnv: b.required("NODE_ENV"),
        testEnv: b.required("TEST_ENV"),
      }))(env),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid config
      Validating \\"TEST_ENV\\" failed with message \\"Not defined\\""
    `);
  });

  it("does not error on missing optional item", () => {
    const env = {
      NODE_ENV: "development",
    };

    const expected = {
      nodeEnv: "development",
    };

    const actual = buildConfig((b) => ({
      nodeEnv: b.required("NODE_ENV"),
      testEnv: b.optional("TEST_ENV"),
    }))(env);

    expect(actual).toEqual(expected);
  });

  it("runs coercion on required items", () => {
    const env = {
      PORT: "5000",
    };

    const expected = {
      port: 5000,
    };

    const actual = buildConfig((b) => ({
      port: b.required("PORT", { coerce: parseInt }),
    }))(env);

    expect(actual).toEqual(expected);
  });

  it("runs coercion on optional items", () => {
    const env = {
      PORT: "5000",
    };

    const expected = {
      port: 5000,
    };

    const actual = buildConfig((b) => ({
      port: b.optional("PORT", {
        coerce: (value) => (value ? parseInt(value) : -1),
      }),
    }))(env);

    expect(actual).toEqual(expected);
  });

  it("runs validation on required items", () => {
    const env = {
      SECRET_STUFF: "xxx",
    };

    expect(() =>
      buildConfig((b) => ({
        secret: b.required("SECRET_STUFF", {
          validate: (value, { valid, invalid }) => {
            if (value.length < 8) {
              return invalid("Too short, not secret enough");
            }
            return valid();
          },
        }),
      }))(env),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid config
      Validating \\"SECRET_STUFF\\" failed with message \\"Too short, not secret enough\\""
    `);
  });

  it("runs validation on optional items", () => {
    const env = {
      SECRET_STUFF: "xxx",
    };

    expect(() =>
      buildConfig((b) => ({
        secret: b.optional("SECRET_STUFF", {
          validate: (value, { valid, invalid }) => {
            if (value && value.length < 8) {
              return invalid("Too short, not secret enough");
            }
            return valid();
          },
        }),
      }))(env),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid config
      Validating \\"SECRET_STUFF\\" failed with message \\"Too short, not secret enough\\""
    `);
  });

  it("catches validation errors on required items", () => {
    const env = {
      TEST: "xxx",
    };

    expect(() =>
      buildConfig((b) => ({
        test: b.required("TEST", {
          validate: () => {
            throw new Error("Oh no");
          },
        }),
      }))(env),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid config
      Validating \\"TEST\\" failed with message \\"Oh no\\""
    `);
  });

  it("catches validation errors on optional items", () => {
    const env = {
      TEST: "xxx",
    };

    expect(() =>
      buildConfig((b) => ({
        test: b.optional("TEST", {
          validate: () => {
            throw new Error("Oh no");
          },
        }),
      }))(env),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid config
      Validating \\"TEST\\" failed with message \\"Oh no\\""
    `);
  });

  it("catches coercion errors on required items", () => {
    const env = {
      TEST: "xxx",
    };

    expect(() =>
      buildConfig((b) => ({
        test: b.required("TEST", {
          coerce: () => {
            throw new Error("Oh no");
          },
        }),
      }))(env),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid config
      Validating \\"TEST\\" failed with message \\"Oh no\\""
    `);
  });

  it("catches coercion errors on optional items", () => {
    const env = {
      TEST: "xxx",
    };

    expect(() =>
      buildConfig((b) => ({
        test: b.optional("TEST", {
          coerce: () => {
            throw new Error("Oh no");
          },
        }),
      }))(env),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid config
      Validating \\"TEST\\" failed with message \\"Oh no\\""
    `);
  });
});
